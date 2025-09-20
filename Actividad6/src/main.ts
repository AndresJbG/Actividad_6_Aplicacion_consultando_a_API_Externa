// src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { NavbarComponent } from './app/shared/navbar/navbar';

bootstrapApplication(NavbarComponent, {
  providers: [...(appConfig.providers ?? [])],
}).catch(err => console.error(err));
