export class CartDto {
    highlight: string;
    expand: string;
    table: string;

    constructor(highlight: string, expand: string, table: string) {
        this.highlight = highlight;
        this.expand = expand;
        this.table = table;
    }
 }