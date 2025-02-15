/// <reference types="@angular/localize" />

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

// document.addEventListener('contextmenu', (e) => e.preventDefault());
// document.addEventListener('keydown', (e) => {
//   if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I')) {
//     e.preventDefault();
//   }
// });

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
