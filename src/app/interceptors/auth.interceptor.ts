import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const token = localStorage.getItem('token');

  const excludedUrls = ['/login'];
  const isExcluded = excludedUrls.some(url => req.url.endsWith(url));

  const clonedReq = token && !isExcluded
      ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
      : req;

  return next(clonedReq).pipe(
    catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          authService.logout();
        } else if (error.status === 404) {
          router.navigate(['not-found']);
        } else {
          alert(error.error.error);
        }

        return throwError(() => error);
    })
  );
};
