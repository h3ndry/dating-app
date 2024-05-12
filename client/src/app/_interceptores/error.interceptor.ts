import { HttpErrorResponse, HttpEvent, HttpEventType, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, catchError, tap } from 'rxjs';

export function loggingInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const router = inject(Router);
  const toaster = inject(ToastrService);

  return next(req).pipe(catchError((error: HttpErrorResponse) => {
    console.log(error)
    if (error) {
      switch (error.status) {
        case 400:
          if (error.error.errors) {
            const modelStateErros = []

            for (const key in error.error.errors) {
              if (error.error.errors[key]) {
                modelStateErros.push(error.error.errors[key])
              }
            }
            throw modelStateErros
          } else {
            toaster.error(error.error, error.status.toString())
          }
          break;
        case 401:
          toaster.error("Unathosirize", error.status.toString())
          break;
        case 404:
          router.navigateByUrl('/not-found')
          break;
        case 500:
          const navigationEtras: NavigationExtras = { state: { error: error.error } }
          router.navigateByUrl('/server-error', navigationEtras)
          break;
        default:
          toaster.error("Something unexpected went wrong", error.status.toString())
          console.log(error)
          break;
      }
    }
    throw Error
  }));
}
