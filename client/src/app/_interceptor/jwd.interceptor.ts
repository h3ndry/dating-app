import { HttpInterceptorFn } from '@angular/common/http';

export const jwdInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};
