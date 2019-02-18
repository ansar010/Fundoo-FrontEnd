import { Component, OnInit } from '@angular/core';
import { ResetPassword } from 'src/app/model/resetP.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetpasswordModel: ResetPassword = new ResetPassword();
  resetPForm: FormGroup;
  loading;
  token: string;

  constructor(private formBuilder: FormBuilder, private snackBar: MatSnackBar,
    private userServices: UserServiceService, router: Router,
    private activeRoute: ActivatedRoute) {
    this.token = this.activeRoute.snapshot.params['token'];
  }

  ngOnInit() {
    this.resetPForm = this.formBuilder.group(
      {
        'password': [this.resetpasswordModel.password,
        [
          Validators.min(6),
          Validators.max(10),
          Validators.required

        ]],

        'confirmpassword': [this.resetpasswordModel.password,
        [
          Validators.min(6),
          Validators.max(10),
          Validators.required

        ]]
      }
    );
  }

  resetPassword(): void {
    this.loading = true;
    this.userServices.resetPasswordCall(this.resetpasswordModel, this.token).subscribe(
      (response: any) => {
        this.loading = false;
        console.log(response);

        if (response.statusCode === 200) {
          this.snackBar.open(response.statusMessge, 'logged-In', { duration: 2000, });
          // console.log(response.header.get('jwtToken'));

          // localStorage.setItem('token', response.headers.get('jwtToken'));
        }
      },
      error => {
        this.loading = false;

        this.snackBar.open('fail', 'Login Fails', {
          duration: 2000,
        });
        console.log('Error', error);
      }
    );
  }

}
