import { Method } from "./Method";

export abstract class Web extends Method {
    static render(path){
        return path;
    }
}