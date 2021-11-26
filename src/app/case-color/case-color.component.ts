import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { Board, Case } from '../domain';
import { MatSnackBar } from '@angular/material/snack-bar'

@Component({
  selector: 'app-case-color',
  templateUrl: './case-color.component.html',
  styleUrls: ['./case-color.component.scss'], changeDetection: ChangeDetectionStrategy.OnPush
})
export class CaseColorComponent {
  private board = new Board();
  private cases = this.board.getCases();

  currentCase: Case | undefined;

  constructor(private router: Router, private matSnackBar: MatSnackBar) {
    this.selectRandomCase();
  }

  selectRandomCase() {
    const randomIndex = Math.floor(Math.random() * this.cases.length);
    this.currentCase = this.cases[randomIndex];
  }

  onSubmit(answer: boolean) {
    this.matSnackBar.dismiss();

    if (this.currentCase?.getColor() !== answer) {
      this.matSnackBar.open(
        `${this.currentCase?.toString()} est de couleur ${answer ? 'blanche' : 'noire'}.`, 'OK', { duration: 2000 }
      );
    }
    this.selectRandomCase();
  }

  onNavigationBefore() {
    this.router.navigate(['..']);
  }
}
