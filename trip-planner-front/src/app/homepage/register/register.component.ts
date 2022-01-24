import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { CustomValidators } from 'src/app/providers/CustomValidators';
import { UserDto } from 'src/app/_models/dto/userDto';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: UserDto;
  form: FormGroup;
  usernames: string[];


  constructor(private ref: DynamicDialogRef, 
    formBuilder: FormBuilder, private userService: UserService) {
    this.user = new UserDto();
    this.usernames = [];

    this.form = formBuilder.group({
      fullName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      username: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)])
    }, {
      validators: [
        CustomValidators.mustMatch('password', 'confirmPassword'),
        this.validateUsername('username')
      ]
    });
  }

  ngOnInit(): void {
  }

  onFormSubmitSignUp(user) {
    const { valid } = this.form;
    if (valid) {
      this.ref.close(user);
    }
  }

  validateUsername(username: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[username];

      if (control.errors && !control.errors.validateUsername) {
        return;
      }

      this.userService.getAllUsernames().subscribe(
        data => {
          this.usernames = data;
          for (let i = 0; i < this.usernames.length; i++) {
            if (control.value === this.usernames[i]) {
              control.setErrors({ validateUsername: true });
              break;
            } else {
              control.setErrors(null);
            }
          }
        }
      );
      return null;
    };

  }

}
