export class Row {
    private value = [1, 3, 5, 7].includes(this.index) ? 1 : -1;

    constructor(private index: number) { }

    getIndex() {
        return this.index;
    }

    getValue() {
        return this.value;
    }
}