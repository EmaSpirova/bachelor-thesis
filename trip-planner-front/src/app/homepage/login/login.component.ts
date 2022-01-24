import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { LoginRequest } from 'src/app/_models/dto/loginRequest';
import { PlannerLocationDto } from 'src/app/_models/dto/plannerLocationDto';
import { UserDto } from 'src/app/_models/dto/userDto';
import { UsernameDto } from 'src/app/_models/dto/usernameDto';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  loginRequest: LoginRequest;
  usernames: string[];

  constructor(private ref: DynamicDialogRef, private userService: UserService, formBuilder: FormBuilder) {
    this.loginRequest = new LoginRequest();
    this.usernames = [];

    this.form = formBuilder.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    },
      {
        validators: [
          this.validateUser('username')
        ]
      }
    );
  }

  ngOnInit(): void {

  }

  onFormLogIn(loginRequest) {
    const { valid } = this.form;
    if (valid) {
      this.ref.close(loginRequest);
    }
  }

  validateUser(username: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[username];

      if (control.errors && !control.errors.validateUser) {
        return;
      }

      this.userService.getAllUsernames().subscribe(
        data => {
          this.usernames = data;
          for (let i = 0; i < this.usernames.length; i++) {
            if (control.value === this.usernames[i]) {
              control.setErrors(null);
             
              break;
            } else {
              control.setErrors({ validateUser: true });
            }

          }
        }
      );
      return null;
  
    };

  }
}
