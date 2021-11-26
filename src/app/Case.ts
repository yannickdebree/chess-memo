export class Case {
    private color: boolean;

    constructor(private column: string, private row: number) {
        if (['A', 'C', 'E', 'G'].includes(column) && [2, 4, 6, 8].includes(row)) {
            this.color = false;
        } else {
            this.color = true;
        }
    }

    getColor() {
        return this.color;
    }

    toString() {
        return `${this.column}${this.row}`
    }
}