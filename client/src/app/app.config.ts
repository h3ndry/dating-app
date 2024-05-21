import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideAnimations } from '@angular/platform-browser/animations';

import { provideToastr } from 'ngx-toastr';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { loggingInterceptor } from './_interceptor/error.interceptor';
import { jwtInterceptor } from './_interceptor/jwt.interceptor';
export const appConfig: ApplicationConfig = {
  providers: [

    provideRouter(routes),

    provideHttpClient(
      withInterceptors([loggingInterceptor, jwtInterceptor])
    ),

    provideAnimations(),
// TabsModule.forRoot(),

    provideToastr({
      positionClass: 'toast-bottom-right'
    }),
  ]
};
