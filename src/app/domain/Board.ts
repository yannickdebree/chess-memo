import { Case, Column, Row } from '.';

export class Board {
  private cases = new Array<Case>();

  constructor() {
    const columns = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'].map((letter) => new Column(letter));
    const rows = [1, 2, 3, 4, 5, 6, 7, 8].map((index) => new Row(index));

    columns.forEach((column) => {
      rows.forEach((row) => {
        this.cases.push(new Case(column, row));
      });
    });
  }

  getCases() {
    return this.cases;
  }
}
