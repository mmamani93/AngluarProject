import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';

//BUG QUE NO MANTIENE EL ORDEN!
@Component({
    selector: 'ng4-table',
    templateUrl: './ng4table.component.html'
})
export class Ng4Table implements OnInit, OnChanges {
    @Input() public data: any[] = [];
    @Input() options: any;
    @Output() addEvent = new EventEmitter();
    @Output() editEvent = new EventEmitter();
    @Output() viewEvent = new EventEmitter();
    @Output() deleteEvent = new EventEmitter();
    @Output() updateSelected = new EventEmitter();
    @Output() dblClickRow = new EventEmitter();

    //Option properties
    enableGeneralSearch: boolean;
    enableProjectSearch: boolean;
    enablePagination: boolean;
    sortColumns: number[];
    searchColumns: number[];
    rowEdit: boolean;
    rowDelete: boolean;
    rowSelector: boolean;
    multiSelect: boolean;
    paginationOptions: number[];
    paginationInputEnable: boolean;
    formatDate: String;
    actions: string[];

    selectedItems: any[];
    dataToShow: any[];
    showOptions: Object = {};
    //Table Fill variables
    tableHeaders: string[];
    nameHeaders: string[];
    //Pagination Properties
    paginationPrevious: boolean = false;
    paginationNext: boolean = true;
    rowNumber: string;
    IsPagination: Boolean = false;
    PaginationArray: any = [];
    CurrentPage: number = 1;
    //Pagination Filter
    firstElement: number = 0;
    lastElement: number;
    //Sorting Properties
    sortedElement: string;
    sortedWay: number = 1;
    //General Filter Properties
    filterInput: string;

    showAddAction: boolean = false;
    showEditAction: boolean = false;
    showDeleteAction: boolean = false;
    showDetailAction: boolean = false;

    columns: number = 1;

    constructor() {
        //Default Initiation 
        this.enableGeneralSearch = true;
        this.enableProjectSearch = false;
        this.enablePagination = true;
        this.sortColumns = [];
        this.searchColumns = [];
        this.rowEdit = false;
        this.rowDelete = false;
        this.rowSelector = false;
        this.multiSelect = false;
        this.selectedItems = [];
        this.paginationOptions = [2, 5, 10, 20, 50, 100];
        this.paginationInputEnable = true;
        this.rowNumber = "10";
        this.formatDate = "shortDate"
        this.actions = [];
    }
    

    ngOnInit() {
     }

    ngOnChanges(changes: SimpleChanges) {
        // changes.prop contains the old and the new value...
        this.dataToShow = this.data;
        this.selectedItems = [];
        this.readOptions();
        this.getHeaders();
        this.refreshProperties();
        this.updatePreviousNext();
        this.updateLastElement();
        this.showActions();
    }

    changeRowNumber() {
        this.refreshProperties();
    }


    // Method for Refresh parameters 
    refreshProperties() {
        this.verifyIfPagination();
        this.generatePaginationArray();
        this.resetPage();
    }

    //Read option
    readOptions() {
        if (this.options) {
            if (this.options.enableGeneralSearch != undefined)
                this.enableGeneralSearch = this.options.enableGeneralSearch;
            if (this.options.enableProjectSearch != undefined)
                this.enableProjectSearch = this.options.enableProjectSearch;
            if (this.options.enablePagination != undefined)
                this.enablePagination = this.options.enablePagination;
            if (this.options.sortColumns)
                this.sortColumns = this.options.sortColumns;
            if (this.options.searchColumns)
                this.searchColumns = this.options.searchColumns;
            if (this.options.rowEdit)
                this.rowEdit = this.options.rowEdit;
            if (this.options.rowDelete)
                this.rowDelete = this.options.rowDelete;
            if (this.options.rowSelector)
                this.rowSelector = this.options.rowSelector;
            if (this.options.paginationgOptions)
                this.paginationOptions = this.options.paginationgOptions;
            if (this.options.paginationInputEnable)
                //SI quito una linea no funciona JAJAJAJJA!
                this.paginationInputEnable = this.options.paginationInputEnable;
            this.paginationInputEnable = this.options.paginationInputEnable;
            if (this.options.paginationDefaultOption)
                this.rowNumber = this.options.paginationDefaultOption.toString();
            if (this.options.formatDate)
                this.formatDate = this.options.formatDate;
            if (this.options.actions)
                this.actions = this.options.actions;
            if (this.options.showAddAction)
                this.showAddAction = this.options.showAddAction;
            if (this.options.showDetailAction)
                this.showDetailAction = this.options.showDetailAction;
        }
    }

    //Methods for Pagination
    verifyIfPagination() {
        if (this.enablePagination == false)
            this.rowNumber = "100000000000";
        this.IsPagination = this.dataToShow.length / parseInt(this.rowNumber) > 1;
    }

    showActions() {
        if (this.actions.length > 0) {
            this.showAddAction = this.actions.find(a => a == 'add') != undefined;
            this.showEditAction = this.actions.find(a => a == 'edit') != undefined;
            this.showDeleteAction = this.actions.find(a => a == 'delete') != undefined;
            this.showDetailAction = this.actions.find(a => a == 'detail') != undefined;
        }
    }

    generatePaginationArray() {

        if (!this.enablePagination || this.dataToShow.length == 0) {
            this.PaginationArray = [1];
            return true;
        }

        let PagesNumber = Math.floor(this.dataToShow.length / parseInt(this.rowNumber));
        if (this.dataToShow.length % parseInt(this.rowNumber)) {
            PagesNumber = PagesNumber + 1;
        }
        this.PaginationArray = Array(PagesNumber).fill(0).map((x, i) => i + 1);
    }

    changePage(pageNumber: number) {
        this.CurrentPage = pageNumber;
        this.updatePreviousNext();
        this.updateFirstElement();
        this.updateLastElement();

    }

    resetPage() {
        this.CurrentPage = 1;
        this.updatePreviousNext();
        this.updateFirstElement();
        this.updateLastElement();
    }

    //Pagination active buttons
    updatePreviousNext() {
        if (this.CurrentPage == 1)
            this.paginationPrevious = false;
        else
            this.paginationPrevious = true;

        if (this.CurrentPage == this.PaginationArray[this.PaginationArray.length - 1])
            this.paginationNext = false;
        else
            this.paginationNext = true;
    }
    enableAction() {
        return !(this.selectedItems.length > 0);
    }

    //Update the array filter
    updateFirstElement() {
        this.firstElement = (this.CurrentPage - 1) * parseInt(this.rowNumber);
    }

    updateLastElement() {
        let dataLenght = this.dataToShow.length;
        let initial: number = (this.CurrentPage - 1) * parseInt(this.rowNumber);

        if (this.paginationNext)
            this.lastElement = initial + parseInt(this.rowNumber);
        else
            this.lastElement = initial + dataLenght % parseInt(this.rowNumber) + 1;
    }

    // Fill the Table
    getHeaders() {
        //The component can obtain table headers by the options input attribute (options.theaders) or by the Data Array
        if (this.options) {
            if (this.options.theaders) {
                this.tableHeaders = this.options.theaders;
                this.nameHeaders = this.options.theaders;
                if (this.options.theadersNames)
                    this.nameHeaders = this.options.theadersNames;
            } else {
                if (this.dataToShow && this.dataToShow.length > 0) {
                    this.tableHeaders = Object.keys(this.dataToShow[0]);
                    this.nameHeaders = this.tableHeaders;
                } else {
                    this.tableHeaders = [];
                    this.nameHeaders = [];
                }
                if (this.options.theadersNames)
                    this.nameHeaders = this.options.theadersNames;
            }
        } else {
            if (this.dataToShow) {
                this.tableHeaders = Object.keys(this.dataToShow[0]);
                this.nameHeaders = this.tableHeaders;
            } else {
                this.tableHeaders = [];
                this.nameHeaders = [];
            }
        }
        this.columns = this.tableHeaders.length;
    }

    // Sort Table
    sortTable(element: string) {
        var way;
        if (this.sortedElement == element)
            this.sortedWay = this.sortedWay * -1;
        else
            this.sortedWay = 1;
        way = this.sortedWay;
        if (!this.sortedElement || this.sortedElement != element)
            this.sortedElement = element;

        this.dataToShow.sort(function (a, b) {
            if (a[element] < b[element]) return (-1 * parseInt(way));
            if (a[element] > b[element]) return (1 * parseInt(way));
            return 0;
        });

        this.dataToShow = this.dataToShow.slice();
    }

    //General Search Filter
    generalSearch() {
        if (this.filterInput) {
            this.dataToShow = this.data;
            this.dataToShow = this.dataToShow.filter((element) => {
                let toShow = false;
                this.tableHeaders.forEach((header, index) => {
                    if (this.searchColumns.indexOf(index) > -1 || this.searchColumns.length === 0) {
                        let str: String = element[header] ? element[header] : "";
                        if (str.toString().toLowerCase().includes(this.filterInput.toLowerCase()))
                            toShow = true;
                    }
                });
                return toShow;
            });
        } else {
            this.dataToShow = this.data;
        }
        this.refreshProperties();
        this.dataToShow = this.dataToShow.slice();
    }

    //Process Data to Show
    processDataShow() {
        if (this.options) {
            let toShow = [];
            if (this.options.theaders) {
                this.data.forEach(row => {
                    let objectToPush = {};
                    this.options.theaders.forEach((header, index) => {

                        if (this.options.theadersNames && this.options.theadersNames[index]) {
                            objectToPush[this.options.theadersNames[index]] = row[header] ? row[header] : "";
                        }
                        else {
                            objectToPush[header] = row[header] ? row[header] : "";
                        }
                    });
                    toShow.push(objectToPush);
                });
            } else {
                toShow = this.data;
            }

            //With all the options processed
            this.data = toShow;
        }
    }

    //Select Row
    selectRow(rowClicked: any) {
        if (this.rowSelector && this.rowSelector == true) {
            let selectedRowNumber = rowClicked + ((this.CurrentPage - 1) * parseInt(this.rowNumber));
            if (this.multiSelect) {

                if (!this.dataToShow[selectedRowNumber].selectedByNgTable || this.dataToShow[selectedRowNumber].selectedByNgTable === false) {
                    this.dataToShow[selectedRowNumber].selectedByNgTable = true;
                    this.selectedItems.push(this.dataToShow[selectedRowNumber]);
                }
                else {
                    this.dataToShow[selectedRowNumber].selectedByNgTable = false;
                    let index = this.selectedItems.indexOf(this.dataToShow[selectedRowNumber]);
                    if (index > -1) {
                        this.selectedItems.splice(index, 1);
                    }
                }
            } else {
                for (var index = 0; index < this.dataToShow.length; index++) {
                    this.dataToShow[index].selectedByNgTable = false;
                }

                this.selectedItems.length = 0;

                this.dataToShow[selectedRowNumber].selectedByNgTable = true;
                this.selectedItems.push(this.dataToShow[selectedRowNumber]);
            }


            this.updateSelected.emit(this.selectedItems);
        } else {
            //do nothing if rowselector disabled
        }

    }

    dobleClickRow(rowDblClicked: any) {
        this.dblClickRow.emit(rowDblClicked);
    }

}
