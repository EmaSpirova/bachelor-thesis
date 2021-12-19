import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { LoginRequest } from '../_models/dto/loginRequest';
import { UserDto } from '../_models/dto/userDto';
import { Location } from '../_models/location';
import { LocationService } from '../_services/location.service';
import { UserService } from '../_services/user.service';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';


@Component({
   selector: 'app-homepage',
   templateUrl: './homepage.component.html',
   styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

   imageURI = 'https://i.pinimg.com/736x/a1/1a/57/a11a572a1ec4e07039bbd04661a3b035.jpg';
   myLogo = 'http://www.logo-designer.co/wp-content/uploads/2020/02/2020-tripadvisor-new-logo-design-by-mother-design-4.png';
   responsiveOptions;
   locations: Location[];
   villages: Location[];
   ref: DynamicDialogRef;

   constructor(private locationService: LocationService, private dialogService: DialogService, private userService: UserService,
      private router: Router) {
      this.responsiveOptions = [
         {
            breakpoint: '1024px',
            numVisible: 3,
            numScroll: 3
         },
         {
            breakpoint: '768px',
            numVisible: 2,
            numScroll: 2
         },
         {
            breakpoint: '560px',
            numVisible: 1,
            numScroll: 1
         }
      ];
      this.locations = [];
      this.villages = [];
      this.ref = new DynamicDialogRef;
   }

   ngOnInit(): void {
/*
      this.locationService.getWeekendGetaways().subscribe(
         data => {
            this.locations = data;
         });

      this.locationService.getVillages().subscribe(
         village => {
            this.villages = village;
         }
      );
      */
   }

   onClickSignUp() {
      this.ref = this.dialogService.open(RegisterComponent, {
         header: 'Register form',
         width: '70%',
         contentStyle: { "max-height": "500px", "overflow": "auto" },
         baseZIndex: 10000
      });

      this.ref.onClose.subscribe((user: UserDto) => {
         this.userService.registerUser(user).subscribe(
            data  => {
               console.log(data);
              
            }
         );
      });
   }

   
   onClickLogIn() {
      this.ref = this.dialogService.open(LoginComponent, {
         header: 'Log in if you already have an account',
         width: '70%',
         contentStyle: { "max-height": "500px", "overflow": "auto" },
         baseZIndex: 10000
      });
      this.ref.onClose.subscribe((loginRequest : LoginRequest) => {
         this.userService.authenticateUser(loginRequest).subscribe(
            (data : any)  => {
               console.log(data);
               if(this.userService.isUserLoggedIn()){
                  this.router.navigate(['planners']);
               }
            }
         );
      });
   }
}
