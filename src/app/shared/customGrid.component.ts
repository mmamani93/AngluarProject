import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'customGrid',
    templateUrl: './customGrid.component.html'
})

export class CustomGrid implements OnInit {
    @Input() public data: any[] = [];
    @Input() public gridOptions: any = null;

    ngOnInit(): void {
    }

    sort(column: any): void {
        if (column.sortDescending)
            column.sortDescending = false;
        else
            column.sortDescending = true;

        let direction = column.sortDescending ? 1 : -1;

        this.data.sort(function (a, b) {
            if (a[column.name] < b[column.name]) {
                return -1 * direction;
            }
            else if (a[column.name] > b[column.name]) {
                return 1 * direction;
            }
            else {
                return 0;
            }
        });
    }
}