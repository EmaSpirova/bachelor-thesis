import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { UserDto } from 'src/app/_models/dto/userDto';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user : UserDto;

  constructor(private ref: DynamicDialogRef) {
    this.user = new UserDto();
   }

  ngOnInit(): void {
  }
  
  onFormSubmitSignUp(user){
    this.ref.close(user);
    //window.location.reload();
  }
}
