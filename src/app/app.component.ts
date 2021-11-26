import { Component } from '@angular/core';
import { Board } from './Board';
import { Case } from './Case';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
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
