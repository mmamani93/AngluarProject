

export class GridOption {
    filters: GridFilter[];
    columns: GridColumn[];
    pageSize: number;

}

export class GridFilter {
    name: string;
    text: string;
    value: string;

    constructor(name: string, text: string) {
        this.name = name;
        this.text = text;
        this.value = "";
    }
}

export class GridColumn {
    name: string;
    text: string;
    sortable: boolean;
    sortDescending: boolean;
    sortFunction: Function;

    constructor(name: string, text: string, sortable: boolean, sortDescending: boolean, sortFunction: Function){
        this.name = name;
        this.text = text;
        this.sortable = sortable;
        this.sortDescending = sortDescending;
        this.sortFunction = sortFunction;
    }
}