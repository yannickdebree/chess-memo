import { Component } from '@angular/core';
import { Board, Case } from '../domain';

@Component({
  selector: 'app-case-color',
  templateUrl: './case-color.component.html',
  styleUrls: ['./case-color.component.scss']
})
export class CaseColorComponent {
  private index: number | undefined;
  private board = new Board();
  private cases = this.board.getCases();

  currentCase: Case | undefined;
  error: string | undefined;

  constructor() {
    this.selectRandomCase();
  }

  selectRandomCase() {
    this.index = Math.floor(Math.random() * this.cases.length);
    this.currentCase = this.cases[this.index];
  }

  onSubmit(answer: boolean) {
    this.error = '';
    if (this.currentCase?.getColor() !== answer) {
      this.error = `${this.currentCase?.toString()} est de couleur ${answer ? 'noire' : 'blanche'}.`;
    }
    this.selectRandomCase();
  }

}
