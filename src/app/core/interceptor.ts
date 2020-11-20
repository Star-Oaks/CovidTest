import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class Interceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authReq = req.clone({
      url: environment.api_Covid19 + req.url,
      setHeaders: {
        'x-rapidapi-key': `${environment.x_rapidapi_key}`,
        'x-rapidapi-host': `${environment.x_rapidapi_host}`,
      },
    });

    return next.handle(authReq);
  }
}
