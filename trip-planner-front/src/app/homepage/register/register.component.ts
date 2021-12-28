import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { UserDto } from 'src/app/_models/dto/userDto';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: UserDto;
  myForm: FormGroup;

  constructor(private ref: DynamicDialogRef, private fb: FormBuilder) {
    this.user = new UserDto();
    this.myForm = fb.group({
      title: fb.control('initial value', Validators.required)
    });
  }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      fullName: this.fb.control('', Validators.required),
      username: this.fb.control('', Validators.required),
      password: this.fb.control('', Validators.required),
      confirmPassword: this.fb.control('', Validators.required)
    });
  }

  onFormSubmitSignUp(user) {
    this.ref.close(user);
    //window.location.reload();

  }

}
