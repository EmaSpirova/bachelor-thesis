import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Images } from 'src/app/_models/images';
import { Location } from 'src/app/_models/location';
import { ImagesService } from 'src/app/_services/images.service';
import { LocationService } from 'src/app/_services/location.service';

@Component({
  selector: 'app-location-details',
  templateUrl: './location-details.component.html',
  styleUrls: ['./location-details.component.css']
})
export class LocationDetailsComponent implements OnInit {

  locationId: number;
  locationDetails: Location;
  images: Images[];

  constructor(private route: ActivatedRoute, private locationService: LocationService,
    private imagesService: ImagesService) {
    this.locationId = 1;
    this.locationDetails = new Location();
    this.images = [];
  }

  responsiveOptions:any[] = [
    {
        breakpoint: '1024px',
        numVisible: 5
    },
    {
        breakpoint: '768px',
        numVisible: 3
    },
    {
        breakpoint: '560px',
        numVisible: 1
    }
];
  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        this.locationId = params.id;
      });

    this.locationService.getLocation(this.locationId).subscribe(
      data => {
        this.locationDetails = data;
      }
    );

    this.imagesService.getAllImagesForLocation(this.locationId).subscribe(
      image => {
        this.images = image;
      }
    );
  }


}
