import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Chronometer, StatusChonometer } from 'ngx-chronometer';
import { first } from 'rxjs/operators';
import { Board, Case, Score } from '../domain';
import { CaseColorRecapComponent } from './case-color-recap.component';

@UntilDestroy()
@Component({
  selector: 'app-case-color',
  templateUrl: './case-color.component.html',
  styleUrls: ['./case-color.component.scss'], changeDetection: ChangeDetectionStrategy.OnPush
})
export class CaseColorComponent implements OnInit {
  private board = new Board();
  private cases = this.board.getCases();
  private limitSecond = 300;
  private score = new Score();

  currentCase: Case | undefined;
  chrono: boolean | undefined;
  chronometer = new Chronometer({
    limitSecond: this.limitSecond,
    status: StatusChonometer.start
  });

  constructor(private router: Router, private matSnackBar: MatSnackBar, private activatedRoute: ActivatedRoute, private changeDetectorRef: ChangeDetectorRef, private matDialog: MatDialog) {
    this.selectRandomCase();
  }

  ngOnInit() {
    this.activatedRoute.queryParams.pipe(untilDestroyed(this)).subscribe(({ chrono }) => {
      this.chrono = chrono === "true" ? true : false;
    });
  }

  selectRandomCase() {
    const randomIndex = Math.floor(Math.random() * this.cases.length);
    this.currentCase = this.cases[randomIndex];
  }

  onSubmit(answer: boolean) {
    this.matSnackBar.dismiss();

    if (this.currentCase?.getColor() !== answer) {
      this.score.registerFail();
      this.matSnackBar.open(
        `${this.currentCase?.toString()} est de couleur ${answer ? 'blanche' : 'noire'}.`, 'OK', { duration: 2000 }
      );
    } else {
      this.score.registerSuccess();
    }

    this.selectRandomCase();
  }

  onNavigationBefore() {
    this.router.navigate(['..']);
  }

  onChronoEvent(chronometer: Chronometer) {
    this.changeDetectorRef.markForCheck();

    if (chronometer.second === this.limitSecond && chronometer.status !== StatusChonometer.pause) {
      this.chronometer.pause();
      this.changeDetectorRef.markForCheck();
      this.matDialog.open(CaseColorRecapComponent, { disableClose: true, data: { score: this.score } }).afterClosed().pipe(first()).subscribe(retry => {
        if (retry) {
          this.chronometer.restart();
        } else {
          this.onNavigationBefore();
        }
      })
    }
  }
}
