import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Injector, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { TrackingRepository } from '@_domain';
import { CaseColorTrackingRepositoryService } from '@_services';
import { Chart } from 'chart.js';
import * as dayjs from 'dayjs';
import { combineLatest, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@UntilDestroy()
@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatsComponent implements OnInit, AfterViewInit {
  exercice: string | undefined;

  @ViewChild('canvasContainer')
  canvasContainer: ElementRef<any> | undefined;

  @ViewChild('canvas')
  canvas: ElementRef<any> | undefined;

  private trackingRepository: TrackingRepository | undefined;
  private chart: Chart | undefined;
  private afterViewInit$ = new Subject();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private injector: Injector,
    private renderer2: Renderer2
  ) { }

  ngOnInit() {
    combineLatest([
      this.activatedRoute.queryParams.pipe(switchMap(({ exercice }) => {
        switch (exercice) {
          case "case-color":
          default:
            this.exercice = "Couleur de case";
            this.trackingRepository = this.injector.get(CaseColorTrackingRepositoryService);
        }
        return this.trackingRepository.getTrackings$();
      })),
      this.afterViewInit$]).pipe(untilDestroyed(this)).subscribe(([trackings]) => {
        if (!!this.chart) {
          this.chart.destroy();
        }
        if (this.canvas) {
          const labels = new Array<string>();
          const success = new Array<number>();
          const fails = new Array<number>();

          trackings.forEach(tracking => {
            const label = dayjs(tracking.getDate()).format('DD/MM/YY')
            labels.push(label);
            const trackingData = tracking.getData();
            success.push(trackingData.filter(d => d.getSuccess()).length);
            fails.push(trackingData.filter(d => !d.getSuccess()).length);
          });

          // this.renderer2.setStyle(this.canvasContainer?.nativeElement, 'width', '500px');

          this.chart = new Chart(this.canvas.nativeElement, {
            type: 'line',
            data: {
              labels,
              datasets: [{
                label: '# de succés',
                data: success,
                borderWidth: 1, fill: false, borderColor: 'green'
              }, {
                label: '# d\'échecs',
                data: fails,
                borderWidth: 1, fill: false, borderColor: 'red'
              }],
            },
            options: {
              scales: {
                y: {
                  beginAtZero: true
                }
              }
            }
          });
          this.chart.resize(1000, 500);
          // const canvas = document.querySelector('canvas');
        }
      });
  }

  ngAfterViewInit() {
    this.afterViewInit$.next();
  }

  onNavigationBefore() {
    this.router.navigate(['..']);
  }

  onDropStatistics() {
    this.trackingRepository?.dropTrackings();
  }
}
