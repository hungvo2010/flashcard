import { Method} from "./Method";
import { Pdf } from "./Pdf";
import { Web } from "./Web";

export abstract class MethodManager {
    private static list :any = {};

    static registerMethod(method: Method) {
        this.list[method.toString()] = method;
    }

    static initialize() {
        this.list['web'] = Web;
        this.list['pdf'] = Pdf;
    }

    static render(className: string ,path: string) {
        this.list[className].render(path);
    }

    static len() {
        return Object.keys(this.list).length;
    }
}