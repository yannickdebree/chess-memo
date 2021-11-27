import { Column, Row } from ".";

export class Case {
    private isBlack: boolean;

    constructor(private column: Column, private row: Row) {
        const value = column.getValue() + row.getValue();
        this.isBlack = value === 2 || value === -2;
    }

    getIsBlack() {
        return this.isBlack;
    }

    toString() {
        return `${this.column.getLetter()}${this.row.getIndex()}`
    }
}