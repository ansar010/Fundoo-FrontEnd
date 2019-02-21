import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user.model';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { UserServiceService } from 'src/app/services/user-service.service';
import { MatSnackBar } from '@angular/material';
import { Util } from 'src/app/utility/util';
import { Router } from '@angular/router';

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
    private userService: UserServiceService,
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
          Validators.minLength(6),
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
    this.userService.registerCall(this.user).subscribe(
       data => {
        console.log('Response value ' + data.statusCode , data.statusMessage);
        this.loading = false;
        if (data.statusCode === 200) {
          this.snackBar.open(data.statusMessage, 'Registerd', {
            duration: 2000,
          });
        }
        this.router.navigate(['/login']);
      },

      error => {
        this.loading = false;
        this.snackBar.open('AlreadyExist', 'Registeration Fails', {
          duration: 2000,
        });
      }
    );
  }
}
