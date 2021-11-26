import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon'
import { CaseColorRoutingModule } from './case-color-routing.module';
import { CaseColorComponent } from './case-color.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    CaseColorComponent
  ],
  imports: [
    CommonModule,
    CaseColorRoutingModule, MatIconModule, FlexLayoutModule, MatButtonModule, MatSnackBarModule
  ]
})
export class CaseColorModule { }
