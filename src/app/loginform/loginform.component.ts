import { Component, OnInit } from '@angular/core';
import { LoginService } from '../Services/login.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-loginform',
  templateUrl: './loginform.component.html',
  styleUrls: ['./loginform.component.css']
})
export class LoginformComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private login: LoginService) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      inputEmail: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
      inputPassword: new FormControl('', Validators.required)
    });
  }

  loginUser(data) {
    this.login.loginService(data);
    this.loginForm.reset();
  }

}
