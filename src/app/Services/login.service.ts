import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { LocalStorageService } from 'ngx-webstorage';
import { Router } from '@angular/router';

@Injectable()
export class LoginService {
  public isUserLoggedIn: boolean;
  constructor(
    private router: Router,
    private auth: AuthService,
    private localStorage: LocalStorageService) {
    this.isUserLoggedIn = false;
  }

  public loginService(data): void {
    this.auth.isAuthentication(data)
    .subscribe((response) => {
      if (response) {
        this.isUserLoggedIn = true;
        this.router.navigate(['dashboard']);
      }else {
        this.router.navigate(['login']);
      }
      this.localStorage.store('access_token', response);
    });
  }

  public getUserLoggedIn() {
    return this.isUserLoggedIn;
  }

  logout() {
    this.localStorage.clear('access_token');
    this.router.navigate(['login']);
  }
}
