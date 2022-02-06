import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocationService } from 'src/app/_services/location.service';

@Component({
  selector: 'app-explore-result',
  templateUrl: './explore-result.component.html',
  styleUrls: ['./explore-result.component.css']
})
export class ExploreResultComponent implements OnInit {

  place: string;
  allLocation: any[] = [];

  constructor(private route: ActivatedRoute, private locationService : LocationService) {
    this.place = '';
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
        this.place = params.place;
      }
    );

      this.locationService.getAllLocationsSearch(this.place).subscribe(
        res => {
          this.allLocation = res;
        }
    )
  }

}
