export class CartDto {
    highlight: string;
    expand: string;
    table: string;

    constructor(highlight, expand, table) {
        this.highlight = highlight;
        this.expand = expand;
        this.table = table;
    }
 }