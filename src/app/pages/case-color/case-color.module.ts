import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TranslateModule } from '@ngx-translate/core';
import { NgxChronometerModule } from 'ngx-chronometer';
import { CaseColorRoutingModule } from './case-color-routing.module';
import { CaseColorComponent } from './case-color.component';
import { CaseColorRecapComponent } from './components';

@NgModule({
  declarations: [CaseColorComponent, CaseColorRecapComponent],
  imports: [
    CommonModule,
    CaseColorRoutingModule,
    MatIconModule,
    FlexLayoutModule,
    MatButtonModule,
    MatSnackBarModule,
    NgxChronometerModule,
    MatDialogModule,
    TranslateModule.forChild(),
  ],
})
export class CaseColorModule {}
