import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/user.model';
import { Util } from 'src/app/utility/util';
import { HttpserviceService } from 'src/app/services/httpservice.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  user: User;
  resetForm: FormGroup;
  token: string;
  loading;

  password = new FormControl('', [Validators.required]);
  confirmpassword = new FormControl('', [Validators.required]);

  constructor(
    private httpService: HttpserviceService,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,

  ) { }

  ngOnInit() {
    this.resetForm = this.formBuilder.group({
      password: [],
      confirmpassword: ['', Validators.required, Util.MatchPassword]
    });

    this.route.params.subscribe(param => {
      this.token = param.token;
    });

  }



  onResetPassword() {
    console.log(this.resetForm.value);
    this.loading = true;

    this.httpService.putRequest('resetpassword/' + this.token , this.resetForm.value.password)
      // this.userService.resetPasswordCall(this.resetForm.value.password, this.token)
      .subscribe(
        data => {
          this.loading = false;
          console.log('data ->' + data);
          if (data.statusCode === 100) {
            this.snackBar.open(data.statusMessage, 'end now!!!!',
              {
                duration: 2000,
              });
            this.router.navigate(['/login']);
          } else {
            this.loading = false;
            this.snackBar.open(data.statusMessage, 'fail-to-Reset', {
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

