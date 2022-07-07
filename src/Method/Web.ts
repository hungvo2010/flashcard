import { Method } from "./Method";

export abstract class Web extends Method {

    static render(path: string){
        console.log('this is web');
    }
}