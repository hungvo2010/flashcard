export class TableDto {
    name: string;
    description: string;
    userID: string;
    size: Number;

    constructor(name, description, userID) {
        this.name = name;
        this.description = description;
        this.userID = userID;
        this.size = 0;
    }
}