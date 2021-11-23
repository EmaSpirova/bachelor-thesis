import { Component, OnInit } from '@angular/core';
import { Location } from '../_models/location';
import { LocationService } from '../_services/location.service';


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

   constructor(private locationService: LocationService) {
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
   }

   ngOnInit(): void {

      this.locationService.getWeekendGetaways().subscribe(
         data => {
            this.locations = data;
         });

      this.locationService.getVillages().subscribe(
         village => {
            this.villages = village;
         }
      );
   }
}
