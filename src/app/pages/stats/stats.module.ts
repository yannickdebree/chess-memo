import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { StatsRoutingModule } from './stats-routing.module';
import { StatsComponent } from './stats.component';

@NgModule({
  declarations: [StatsComponent],
  imports: [
    CommonModule,
    StatsRoutingModule,
    MatIconModule,
    FlexLayoutModule,
    MatButtonModule,
    TranslateModule.forChild(),
    MatListModule
  ],
})
export class StatsModule {}
