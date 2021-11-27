export class Column {
    private value: number;

    constructor(private letter: string) {
        this.value = ['A', 'C', 'E', 'G'].includes(letter) ? 1 : -1;
    }

    getLetter() {
        return this.letter;
    }

    getValue() {
        return this.value;
    }
}