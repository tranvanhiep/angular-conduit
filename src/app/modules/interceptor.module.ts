import { NgModule, Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HTTP_INTERCEPTORS,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtService } from '../services';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  constructor(private jwtService: JwtService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.jwtService.getToken();
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };
    req = req.clone({ setHeaders: headers });

    if (
      token &&
      req.method !== 'OPTIONS' &&
      req.method !== 'HEAD'
    ) {
      req = req.clone({
        headers: req.headers.append('Authorization', `Token ${token}`),
      });
    }

    return next.handle(req);
  }
}

@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestInterceptor,
      multi: true,
    },
  ],
})
export class InterceptorModule {}
