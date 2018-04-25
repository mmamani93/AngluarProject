import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'customGrid',
    templateUrl: './customGrid.component.html'
})

export class CustomGrid implements OnInit {
    @Input() public data: any[] = [];
    @Input() public gridOptions: any = null;
    @Output() editEvent = new EventEmitter();
    @Output() deleteEvent = new EventEmitter();

    pagesAmount: number;
    paginationArray: number[];
    paginationNext: boolean = true;
    paginationPrevious: boolean = false;
    currentPage: number = 1;
    dataToShow: any[];

    ngOnInit(): void {
    }

    ngOnChanges(changes: SimpleChanges) {
        if (this.data) {
            this.dataToShow = this.data;
            this.doInitialSort();
            this.doPaginate();
        }
    }

    changePage(pageNumber: number) {
        this.currentPage = pageNumber;
        this.doPaginate();
        this.updatePreviousAndNext();
    }

    updatePreviousAndNext() {
        if (this.currentPage == 1)
            this.paginationPrevious = false;
        else
            this.paginationPrevious = true;

        if (this.currentPage == this.paginationArray[this.paginationArray.length - 1])
            this.paginationNext = false;
        else
            this.paginationNext = true;
    }


    doPaginate(): void {
        this.pagesAmount = Math.ceil(this.data.length / this.gridOptions.pageSize);
        this.paginationArray = Array(this.pagesAmount).fill(0).map((x, i) => i + 1);

        let start = (this.currentPage * this.gridOptions.pageSize) - this.gridOptions.pageSize;
        let end = (this.currentPage * this.gridOptions.pageSize);
        this.dataToShow = this.data.slice(start, end);
    }

    sort(column: any): void {
        let direction = column.sortDescending ? 1 : -1;

        this.data.sort(function (a, b) {
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
}