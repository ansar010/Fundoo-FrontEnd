import { Component, OnInit } from '@angular/core';
import { ForgetPassword } from 'src/app/model/forgetP.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { UserServiceService } from 'src/app/services/user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {

  forgetpasswordModel: ForgetPassword = new ForgetPassword();
  forgetPForm: FormGroup;
  loading;

  constructor(private formBuilder: FormBuilder, private snackBar: MatSnackBar,
    private userServices: UserServiceService, private router: Router) { }

  ngOnInit() {
    this.forgetPForm = this.formBuilder.group(
      {
        'email': [this.forgetpasswordModel.email,
        [
          Validators.email,
          Validators.required

        ]]
      }
    );
  }

  forgetPassword(): void {
    this.loading = true;
    this.userServices.forgetPasswordCall(this.forgetpasswordModel).subscribe(
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

        this.snackBar.open('fail', 'Process Fails', {
          duration: 2000,
        });
        console.log('Error', error);
      }
    );
  }
}
