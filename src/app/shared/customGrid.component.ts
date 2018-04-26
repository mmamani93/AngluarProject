import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { GridOption} from '../structures/gridOption';

@Component({
    selector: 'customGrid',
    templateUrl: './customGrid.component.html',
    styleUrls: ['customGrid.component.css']
})

export class CustomGrid implements OnInit {
    @Input() public data: any[] = [];
    @Input() public gridOptions: GridOption = null;
    @Output() editEvent = new EventEmitter();
    @Output() deleteEvent = new EventEmitter();

    pagesAmount: number;
    paginationArray: number[];
    paginationNext: boolean = true;
    paginationPrevious: boolean = false;
    currentPage: number = 1;
    dataToShow: any[];
    dataFiltered: any[];

    ngOnInit(): void {
    }

    ngOnChanges(changes: SimpleChanges) {
        if (this.data) {
            this.dataFiltered = this.data;
            this.dataToShow = this.data;
            this.filterCustom();
            this.doInitialSort();
        }
    }

    filterCustom(): void {
        let filtered: any[] = [];
        for (let filter of this.gridOptions.filters) {
            if (filter.value) {
                for (let obj of this.data) {
                    if (obj[filter.name] && obj[filter.name].toLowerCase().indexOf(filter.value.toLowerCase()) == -1)
                        filtered.push(obj);
                }
            }
        }

        this.dataFiltered = this.data.filter(function (a) {
            return !filtered.includes(a);
        });

        this.doPaginate();
    }


    changePage(pageNumber: number) {
        this.currentPage = pageNumber;
        this.doPaginate();
    }

    updatePreviousAndNext() {
        if (this.currentPage == 1 || this.paginationArray.length == 0)
            this.paginationPrevious = false;
        else
            this.paginationPrevious = true;

        if (this.currentPage == this.paginationArray[this.paginationArray.length - 1] || this.paginationArray.length == 0)
            this.paginationNext = false;
        else
            this.paginationNext = true;
    }

    doPaginate(): void {
        this.pagesAmount = Math.ceil(this.dataFiltered.length / this.gridOptions.pageSize);
        this.paginationArray = Array(this.pagesAmount).fill(0).map((x, i) => i + 1);

        let start = (this.currentPage * this.gridOptions.pageSize) - this.gridOptions.pageSize;
        let end = (this.currentPage * this.gridOptions.pageSize);
        this.dataToShow = this.dataFiltered.slice(start, end);

        if (this.pagesAmount == 1)
            this.currentPage = 1;
        this.updatePreviousAndNext()
    }

    sort(column: any): void {
        let direction = column.sortDescending ? 1 : -1;

        if (column.sortFunction)
            this.dataFiltered.sort(column.sortFunction(column, direction));
        else {
            this.dataFiltered.sort(function (a, b) {
                if (a[column.name].toLowerCase() < b[column.name].toLowerCase()) {
                    return -1 * direction;
                }
                else if (a[column.name].toLowerCase() > b[column.name].toLowerCase()) {
                    return 1 * direction;
                }
                else {
                    return 0;
                }
            });
        }

        if (column.sortDescending)
            column.sortDescending = false;
        else
            column.sortDescending = true;

        this.doPaginate();
    }

    doInitialSort(): void {
        for (let column of this.gridOptions.columns)
            if (column.sortable) {
                this.sort(column);
                return;
            }
    }

    deleteElement(row: any){
        if(confirm("¿Seguro desea eliminar este elemento?"))
            this.deleteEvent.emit(row);
    }
}