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
      response => {
        this.loading = false;
        console.log(response);

        if (response.body.statusCode === 200) {
          this.snackBar.open(response.body.statusMessge, 'logged-In', { duration: 2000, });
          // console.log(response.header.get('jwtToken'));

          localStorage.setItem('token', response.headers.get('jwtToken'));
        } else if (response.body.statusCode === -200) {
          this.loading = false;
          this.snackBar.open(response.body.statusMessge, 'Login-Fail', { duration: 2000, });

        }
      });

      //   error => {
    //     this.loading = false;

    //     this.snackBar.open('fail', 'Login Fails', {
    //       duration: 2000,
    //     });
    //     console.log('Error', error);
    //   }
    // );
  }
}
