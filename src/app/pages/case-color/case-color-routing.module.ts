import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CaseColorComponent } from './case-color.component';

const routes: Routes = [{ path: '', component: CaseColorComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CaseColorRoutingModule {}
