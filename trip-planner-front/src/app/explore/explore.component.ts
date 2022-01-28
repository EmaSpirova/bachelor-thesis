import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { LocationService } from '../_services/location.service';
import { RegionService } from '../_services/region.service';


@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css']
})
export class ExploreComponent implements OnInit {

  text: string;
  loading = [false, false, false, false];
  regions: string[] = [];
  filteredOptions: Observable<any[]> = new Observable<any[]>();
  myControl = new FormControl();
  cityName: string = '';
  selectedPlace: string = '';
  thirdSubscription: Subscription = new Subscription;

  constructor(private locationService: LocationService,
    private regionService: RegionService, private router: Router) {
    this.text = '';
  }

  ngOnInit(): void {

    this.regionService.getAllCitiesAndRegions().subscribe(
      data => {
        this.regions = data;
      }
    );

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value.name)),
      map(name => (name ? this._filter(name) : this.regions.slice())),
    );
  }

  displayFn(city: string): string {
    return city && city ? city : '';
  }

  private _filter(name: string): any[] {
    const filterValue = name.toLowerCase();
    return this.regions.filter(option => option.toLowerCase().includes(filterValue));
  }

  load(index) {
    this.loading[index] = true;
    setTimeout(() => this.loading[index] = false, 1000);
    this.locationService.getAllLocationsSearch(this.selectedPlace).subscribe(
      data => {
        this.router.navigate(['results'], { queryParams: { place: this.selectedPlace } });
      }
    );
  }

  onPlaceSelected(selectedPlace) {
    console.log(this.selectedPlace); // get from view 
  }
}
