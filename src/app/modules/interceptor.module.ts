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
    let headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    if (token && req.method !== 'OPTIONS' && req.method !== 'HEAD') {
      const tokenHeader = { Authorization: `Token ${token}` };
      headers = { ...headers, ...tokenHeader };
    }
    req = req.clone({ setHeaders: headers });

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
