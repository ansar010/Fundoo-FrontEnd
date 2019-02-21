import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginModel } from 'src/app/model/login.model';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/services/user-service.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginModel: LoginModel = new LoginModel();
  loginForm: FormGroup;
  loading;

  constructor(private formBuilder: FormBuilder, private router: Router,
    private userService: UserServiceService, private snackBar: MatSnackBar) {

  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group(
      {
        'email': [this.loginModel.email,
        [
          Validators.required,
          Validators.email
        ]],
        'password': [this.loginModel.password,
        [
          Validators.required,
          Validators.min(6),
          Validators.max(10)
        ]

        ]

      }
    );
  }

  userLogin(): void {
    console.log(this.loginModel);
    this.loading = true;

    this.userService.loginCall(this.loginModel).subscribe(
      (response): any => {
        this.loading = false;
        console.log(response);

        if (response.body.statusCode === 200) {
          this.snackBar.open(response.body.statusMessage, 'logged-In', { duration: 2000, });
          // console.log(response.header.get('jwtToken'));

          localStorage.setItem('token', response.headers.get('jwtToken'));
         } else {
          this.loading = false;
          this.snackBar.open(response.body.statusMessage, 'login-fails', { duration: 2000, });
        }

      },
      error => {
        this.loading = false;

        this.snackBar.open('Email not verified', 'Login Fails', {
          duration: 2000,
        });
        console.log('Error', error);
      }
    );
  }

}
