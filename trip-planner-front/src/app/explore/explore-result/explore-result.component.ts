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

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        this.place = params.place;
      }
    );

      this.locationService.getAllLocationsSearch(this.place).subscribe(
        data => {
          this.allLocation = data;
        }
    )
  }

}
