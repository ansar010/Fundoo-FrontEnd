import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserServiceService } from 'src/app/services/user-service.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  user: User = new User();
  registerForm: FormGroup;
  loading;

  constructor(private formBuilder: FormBuilder,
    private userService: UserServiceService, private snackBar: MatSnackBar) {
  }

  ngOnInit() {

    this.registerForm = this.formBuilder.group(
      {
        'email': [this.user.email,
        [
          Validators.required,
          Validators.email
        ]],

        'password': [this.user.password,
        [
          Validators.required,
          Validators.maxLength(10),
          Validators.minLength(6)
        ]
        ],

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
    this.userService.registerCall(this.user).subscribe(
      response => {
        this.loading = false;
        if (response.statusCode === 200) {
          this.snackBar.open('verification mail sent', 'Registerd', {
            duration: 2000,
          });
        }
      },

      error => {
        this.loading = false;

        this.snackBar.open('AlreadyExixt', 'Registeration Fails', {
          duration: 2000,
        });
        console.log('Error', error);
      }
    );
  }
}
