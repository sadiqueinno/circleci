import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Http, Response, Headers, RequestOptions, HttpModule } from '@angular/http';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AuthService {
  private tempData: any = [];
  private tokenInfo: string;
  constructor(private http: HttpClient, private toastr: ToastrService) { }

  public isAuthentication(data): Observable<any> {
    this.tempData = [];
    this.tokenInfo = null;
    return this.http.get('../../assets/Login.json')
      .map((response) => {
        this.tempData = response;
        if (this.tempData.inputEmail === data.inputEmail && this.tempData.inputPassword === data.inputPassword) {
          this.tokenInfo = this.tempData.access_token;
        }else {
          this.toastr.error('Invalid email id or password');
        }
        return this.tokenInfo;
      });
  }
}
