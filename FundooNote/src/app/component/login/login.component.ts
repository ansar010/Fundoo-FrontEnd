import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginModel } from 'src/app/model/login.model';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { HttpserviceService } from 'src/app/services/httpservice.service';
import { CardUpdateServiceService } from 'src/app/services/card-update-service.service';

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
    private httpService: HttpserviceService,
    private updateService: CardUpdateServiceService) {

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
          // this.updateService.changemessage('false', 'false');
          // this.updateService.changemessage('false', 'false');
          // setTimeout(() => this.updateService.changemessage('false', 'false'), 3000);
          // this.updateService.updateMessage();
          this.router.navigate(['/dashboard']);

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
