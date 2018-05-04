import { Component, OnInit } from '@angular/core';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  tempUserData: any = [];
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUserService()
    .subscribe((response) => {
      this.tempUserData = response;
    });
  }

}
