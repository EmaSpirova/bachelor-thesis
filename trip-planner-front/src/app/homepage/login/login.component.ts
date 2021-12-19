import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { LoginRequest } from 'src/app/_models/dto/loginRequest';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  loginRequest : LoginRequest;

  constructor(private ref: DynamicDialogRef, private router: Router, private userService : UserService) { 
    this.loginRequest = new LoginRequest();
    
  }

  ngOnInit(): void {
  }

  onFormLogIn(loginRequest){
    this.ref.close(loginRequest);
   
  }
}
