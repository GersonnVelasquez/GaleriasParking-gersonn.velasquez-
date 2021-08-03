import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private cookieService: CookieService) { }

  intercept(req: HttpRequest<'GET' | 'POST' | 'PUT'>, next: HttpHandler):
    Observable<HttpEvent<'GET' | 'POST' | 'PUT'>> {
    const token = this.cookieService.get('token');

    if (token) {
      const authReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });

      return next.handle(authReq);
    }

    return next.handle(req);
  }
}
