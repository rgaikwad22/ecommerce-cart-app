import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  isLogin: boolean = false;
  isLoginFailed: boolean = false;
  errorMsg: any

  username = new FormControl('', [
    Validators.required,
  ])
  password = new FormControl('', [
    Validators.required
  ])

  constructor(private formBuilder: FormBuilder, private login: LoginService, private router: Router) { }

  ngOnInit(): void {

  }

  registerForm = this.formBuilder.group({
    username: this.username,
    password: this.password,
  })

  onSubmit() {

    const obj = {
      "username": this.registerForm.value.username,
      "password": this.registerForm.value.password,
    };

    this.login
      .userLogin(obj)
      .subscribe((res: any) => {
        localStorage.setItem('token', res.token)
        if (res.token) {
          this.isLogin = true
          this.isLoginFailed = false;
          setTimeout(() => {
            this.router.navigate(["/products"]);
          }, 1000);
        }
      }, (error) => {
        this.errorMsg = error.error;
        this.isLoginFailed = true;
      });
  }
}
