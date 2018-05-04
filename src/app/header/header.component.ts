import { Component, DoCheck } from '@angular/core';
import { LoginService } from '../Services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements DoCheck {
  showBtn: boolean;
  constructor(private login: LoginService) { }

  ngDoCheck() {
    this.showBtn = this.login.getUserLoggedIn();
  }

  logoff() {
    this.login.logout();
    this.login.isUserLoggedIn = false;
  }
}
