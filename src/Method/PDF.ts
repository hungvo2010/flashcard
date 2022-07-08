import { diskStorage } from "multer";
import { Method } from "./Method";

export abstract class Pdf extends Method {
    filename: string
    path: string
    static storage = diskStorage({
        destination: './uploads',
        filename: function (req, file, cb) {
          cb(null, `${file.originalname}`);
        },
      })

    constructor(pathInput: string, filenameInput: string){
        super();
        this.path = pathInput
        this.filename = filenameInput
    }
    static render(pathI) {
        const response = pathI
        return response
    }
}