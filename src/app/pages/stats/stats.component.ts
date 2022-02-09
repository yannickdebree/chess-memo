import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Injector, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { TranslateService } from '@ngx-translate/core';
import { TrackingRepository } from '@_domain';
import { CaseColorTrackingRepositoryService } from '@_services';
import * as dayjs from 'dayjs';
import { combineLatest } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

interface Stat {
  label: string;
  success: number;
  fails: number;
}

@UntilDestroy()
@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatsComponent implements OnInit {
  exercice: string | undefined;
  stats = new Array<Stat>();

  private trackingRepository: TrackingRepository | undefined;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private injector: Injector,
    private changeDetectorRef: ChangeDetectorRef,
    private translateService: TranslateService
  ) {}

  ngOnInit() {
    combineLatest([this.activatedRoute.queryParams, this.translateService.get('global.caseColor')])
      .pipe(
        map(([{ exercice: exerciceName }, caseColorExerciceName]) => [exerciceName, caseColorExerciceName]),
        switchMap(([exerciceName, caseColorExerciceName]: string[]) => {
          switch (exerciceName) {
            case 'case-color':
            default:
              this.exercice = caseColorExerciceName;
              this.trackingRepository = this.injector.get(CaseColorTrackingRepositoryService);
          }
          return this.trackingRepository.getTrackings$();
        }),
        map((trackings) => trackings.sort((a, b) => b.getDate().getTime() - a.getDate().getTime())),
        untilDestroyed(this)
      )
      .subscribe((trackings) => {
        this.stats = trackings.map((tracking) => {
          const trackingData = tracking.getData();
          return {
            label: dayjs(tracking.getDate()).format('DD/MM/YY'),
            success: trackingData.filter((d) => d.getSuccess()).length,
            fails: trackingData.filter((d) => !d.getSuccess()).length,
          };
        });

        this.changeDetectorRef.markForCheck();
      });
  }

  onNavigationBefore() {
    this.router.navigate(['..']);
  }

  onDropStatistics() {
    this.trackingRepository?.dropTrackings();
  }

  onSelectStat(stat: Stat) {
    console.log(stat);
  }
}
