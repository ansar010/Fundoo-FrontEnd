import { Component, OnInit } from '@angular/core';
import { ForgetPassword } from 'src/app/model/forgetP.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { HttpserviceService } from 'src/app/services/httpservice.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {

  forgetpasswordModel: ForgetPassword = new ForgetPassword();
  forgetPForm: FormGroup;
  loading;

  constructor(private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private httpService: HttpserviceService, private router: Router) { }

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

    this.httpService.postRequest('forgetpassword', this.forgetpasswordModel).subscribe(
      data => {
        this.loading = false;
        console.log(data);

        if (data.statusCode === 100) {
          this.snackBar.open(data.statusMessage, '!', { duration: 2000, });
          this.router.navigate(['/login']);
        } else {
          this.loading = false;
          this.snackBar.open(data.statusMessage, 'Process fail', {
            duration: 3000
          });
        }
    },
    error => {
      this.loading = false;
      this.snackBar.open('Network Problem', 'Process Fails', {
        duration: 2000,
      });
    }
    );
  }
}
