import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/user.model';
import { UserServiceService } from 'src/app/services/user-service.service';
import {Util } from 'src/app/utility/util';

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
    private userService: UserServiceService,
    private snackbar: MatSnackBar,
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

    this.userService.resetPasswordCall(this.resetForm.value.password, this.token)
      .subscribe(data => {
        this.loading = false;
        console.log('data ->' + data);
        if (data.statusCode === 200) {
        this.snackbar.open(data.statusMessage, 'end now!!!!',
          {
            duration: 2000,
          });
        }
        this.router.navigate(['/login']);

      },
        error => {
          this.snackbar.open('Password Not Inserted!!', 'End now', {
            duration: 1000,
          });
        });

  }
}
