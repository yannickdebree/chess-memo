import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Board, Case, Tracking, TrackingData } from '@_domain';
import { CaseColorTrackingRepositoryService } from '@_services';
import { Chronometer, StatusChonometer } from 'ngx-chronometer';
import { first } from 'rxjs/operators';
import { CaseColorRecapComponent } from './components';

@UntilDestroy()
@Component({
  templateUrl: './case-color.component.html',
  styleUrls: ['./case-color.component.scss'], changeDetection: ChangeDetectionStrategy.OnPush
})
export class CaseColorComponent implements OnInit {
  private board = new Board();
  private cases = this.board.getCases();
  private limitSecond = 3;
  private tracking = new Tracking();

  currentCase: Case | undefined;
  chrono: boolean | undefined;
  chronometer = new Chronometer({
    limitSecond: this.limitSecond,
    status: StatusChonometer.start
  });

  constructor(private router: Router, private matSnackBar: MatSnackBar, private activatedRoute: ActivatedRoute, private changeDetectorRef: ChangeDetectorRef, private matDialog: MatDialog, private caseColorTrackingRepositoryService: CaseColorTrackingRepositoryService) {
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

    if (!!this.currentCase && this.chrono) {
      const trackingData = new TrackingData(this.currentCase);
      const isBlack = this.currentCase.getIsBlack();
      if (isBlack !== answer) {
        trackingData.setSuccess(false);
        this.matSnackBar.open(
          `${this.currentCase.toString()} est de couleur ${isBlack ? 'noire' : 'blanche'}.`, 'OK', { duration: 2000 }
        );
      }
      this.tracking.registerData(trackingData);
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
      this.caseColorTrackingRepositoryService.saveTracking(this.tracking)
      this.changeDetectorRef.markForCheck();
      this.matDialog.open(CaseColorRecapComponent, { disableClose: true, data: { tracking: this.tracking } }).afterClosed().pipe(first()).subscribe(retry => {
        if (retry) {
          this.chronometer.restart();
          this.tracking = new Tracking();
        } else {
          this.onNavigationBefore();
        }
      })
    }
  }
}
