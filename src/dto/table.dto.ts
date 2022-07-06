export class TableDto {
    name: string;
    description: string;
    userID: string;
    size: Number;

    constructor(name: string, description: string, userID: string) {
        this.name = name;
        this.description = description;
        this.userID = userID;
        this.size = 0;
    }
}