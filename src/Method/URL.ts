import { Method } from "./Method";

export class URL extends Method {
    path: string;
    constructor(path: string){
        super(path);
    }

    // render() {

    // }

    getHighlightText() {
        let highlight = "";
        return highlight;
    }

    sendInfo() {
    }
}