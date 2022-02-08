export class Column {
  private value = ['A', 'C', 'E', 'G'].includes(this.letter) ? 1 : -1;

  constructor(private letter: string) {}

  getLetter() {
    return this.letter;
  }

  getValue() {
    return this.value;
  }
}
