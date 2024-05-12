import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideAnimations } from '@angular/platform-browser/animations';

import { provideToastr } from 'ngx-toastr';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';
import { loggingInterceptor } from './_interceptores/error.interceptor';
// import { errorInterceptor } from './_interceptores/error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [

    provideRouter(routes),

    provideHttpClient(
      withInterceptors([loggingInterceptor])
    ),

    provideAnimations(),
    provideToastr({
      positionClass: 'toast-bottom-right'
    }),
  ]
};
