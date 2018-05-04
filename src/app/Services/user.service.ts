import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders } from '@angular/common/http';
import { UserDetails } from '../signup/UserDetails';
import { Http, Response } from '@angular/http';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable()
export class UserService {
  readonly baseUrl = '../../assets/Users.json';

  constructor(private http: Http, private localStorage: LocalStorageService) { }

  registerUser(user: UserDetails): Observable<UserDetails> {
    this.localStorage.store('User', user);
    return this.http.post(this.baseUrl, user)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getUserService(): Observable<UserDetails> {
    return this.http.get(this.baseUrl)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(response: Response) {
    const body = response.json();
    return body || {};
  }
  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    return Observable.throw(errMsg);
  }
}
