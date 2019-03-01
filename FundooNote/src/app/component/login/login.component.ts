import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginModel } from 'src/app/model/login.model';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { HttpserviceService } from 'src/app/services/httpservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginModel: LoginModel = new LoginModel();
  loginForm: FormGroup;
  loading;

  constructor(private formBuilder: FormBuilder,
     private router: Router,
    private snackBar: MatSnackBar,
    private httpService: HttpserviceService) {

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
    this.httpService.postRequest('login', this.loginModel).subscribe(
          data => {
            this.loading = false;
             console.log(data);
            // console.log(data.statusCode);
             if (data.statusCode === 100) {
               this.snackBar.open(data.statusMessage, 'logged-In', { duration: 2000, });
               // console.log(response.header.get('jwtToken'));
               localStorage.setItem('token', data.token);
               this.router.navigate(['/dashBoard'])       ;
                     } else {
                this.loading = false;
                this.snackBar.open(data.statusMessage, 'login fail', {
                  duration: 3000
                });
              }
          },
          error => {
            this.loading = false;
            this.snackBar.open('Network Problem', 'login Fails', {
              duration: 2000,
            });
          }
         );
  }

}
