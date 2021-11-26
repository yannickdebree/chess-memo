import { Case } from "./Case";

export class Board {
    private cases = new Array<Case>();

    constructor() {
        const columns = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
        const rows = [1, 2, 3, 4, 5, 6, 7, 8];

        columns.forEach(column => {
            rows.forEach(row => {
                this.cases.push(new Case(column, row))
            })
        })
    }

    getCases() {
        return this.cases;
    }
}