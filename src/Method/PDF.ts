import { Method } from "./Method";

export abstract class Pdf extends Method {
    static render(path: string) {
        console.log('this is Pdf');
    }
}