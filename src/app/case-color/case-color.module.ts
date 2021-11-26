import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgxChronometerModule } from 'ngx-chronometer';
import { CaseColorRecapComponent } from './case-color-recap.component';
import { CaseColorRoutingModule } from './case-color-routing.module';
import { CaseColorComponent } from './case-color.component';

@NgModule({
  declarations: [
    CaseColorComponent, CaseColorRecapComponent
  ],
  imports: [
    CommonModule,
    CaseColorRoutingModule, MatIconModule, FlexLayoutModule, MatButtonModule, MatSnackBarModule, NgxChronometerModule, MatDialogModule
  ]
})
export class CaseColorModule { }
