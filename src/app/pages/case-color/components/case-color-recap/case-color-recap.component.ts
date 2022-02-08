import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Tracking } from '@_domain';

@Component({
  templateUrl: './case-color-recap.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CaseColorRecapComponent {
  success: number;
  fails: number;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    data: {
      tracking: Tracking;
    }
  ) {
    this.success = data.tracking.getData().filter((d) => d.getSuccess()).length;
    this.fails = data.tracking.getData().filter((d) => !d.getSuccess()).length;
  }
}
