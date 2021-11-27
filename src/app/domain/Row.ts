export class Row {
    private value: number;

    constructor(private index: number) {
        this.value = [1, 3, 5, 7].includes(index) ? 1 : -1;
    }

    getIndex() {
        return this.index;
    }

    getValue() {
        return this.value;
    }
}