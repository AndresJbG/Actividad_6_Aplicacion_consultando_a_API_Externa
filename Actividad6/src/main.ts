import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { appConfig } from './app/app.config';
import { NavbarComponent } from './app/shared/navbar/navbar.component';

bootstrapApplication(NavbarComponent, {
  providers: [provideAnimations(), ...appConfig.providers!]
}).catch(err => console.error(err));
