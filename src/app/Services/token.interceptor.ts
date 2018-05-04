import 'rxjs/add/operator/do';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { LocalStorageService } from 'ngx-webstorage';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private localStorage: LocalStorageService, private router: Router, private toastr: ToastrService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const _req = req.clone({
      setHeaders: {
        Authorization: 'Bearer ' + this.localStorage.retrieve('access_token')
      }
    });
    return next.handle(_req).do((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        // console.log(event);
      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          this.toastr.error('Unauthorized');
          this.router.navigate(['login']);
        }
      }
    });
  }
}
