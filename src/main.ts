import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Chart, registerables } from 'chart.js';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

Chart.register(...registerables);

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
