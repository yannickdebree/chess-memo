import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./pages').then(m => m.HomepageModule) },
  { path: 'case-color', loadChildren: () => import('./pages').then(m => m.CaseColorModule) },
  { path: 'stats', loadChildren: () => import('./pages').then(m => m.StatsModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
