import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CaseColorRoutingModule } from './case-color-routing.module';
import { CaseColorComponent } from './case-color.component';


@NgModule({
  declarations: [
    CaseColorComponent
  ],
  imports: [
    CommonModule,
    CaseColorRoutingModule
  ]
})
export class CaseColorModule { }
