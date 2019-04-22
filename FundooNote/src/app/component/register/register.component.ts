/************************************************************************************************
*
*  Purpose         : To Register user
*
*  Description     : Sign-up user
*
*  @file           : register.ts
*  @overview       : To add user with details like username,password, email etc.
*  @author         : Ansar <ansaruddeen030@gmail.com>
*  @since          : 22-04-2019
*
*************************************************************************************************/
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user.model';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
// import { UserServiceService } from 'src/app/services/user-service.service';
import { MatSnackBar } from '@angular/material';
import { Util } from 'src/app/utility/util';
import { Router } from '@angular/router';
import { HttpserviceService } from 'src/app/services/httpservice.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  user: User = new User();
  registerForm: FormGroup;
  loading;

  password = new FormControl('', [Validators.required]);
  confirmpassword = new FormControl('', [Validators.required]);

  constructor(private formBuilder: FormBuilder,
    private httpService: HttpserviceService,
    private snackBar: MatSnackBar,
    private router: Router) {
  }

  ngOnInit() {

    this.registerForm = this.formBuilder.group(
      {
        'email': [this.user.email,
        [
          Validators.required,
          Validators.email
        ]],

        password: [],
        confirmpassword: ['', Validators.required, Util.MatchPassword],

        'name': [this.user.name,
        [
          Validators.required,
        ]
        ],

        'phoneNumber': [this.user.mobileNumber,
        [
          Validators.required,
          Validators.maxLength(10)
        ]
        ]
      }
    );

  }

  register(): void {
    console.log(this.user);
    this.loading = true;
    this.user.password = this.registerForm.value.password;

    this.httpService.postRequest('register', this.user).subscribe(
       data => {
         console.log(data);
        console.log('Response value ' + data.statusCode , data.statusMessage);
        this.loading = false;
        if (data.statusCode === 100) {
          this.snackBar.open(data.statusMessage, 'Registerd', {
            duration: 2000,
          });
          this.router.navigate(['/login']);

        } else {
          this.loading = false;
          this.snackBar.open(data.statusMessage, 'Registration fail', {
            duration: 3000
          });
        }
      },

      error => {
        this.loading = false;
        this.snackBar.open('Network Problem', 'Registeration Fails', {
          duration: 2000,
        });
      }
    );
  }
}
