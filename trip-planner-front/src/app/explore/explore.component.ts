import { Component, OnInit } from '@angular/core';
import { City } from '../_models/city';
import { CityService } from '../_services/city.service';


@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css']
})
export class ExploreComponent implements OnInit {

  cities: City[];
  filteredCountries: any[];
  text: string;
  loading = [false, false, false, false];

  constructor(private cityService: CityService) {
    this.cities = [];
    this.filteredCountries = [];
    this.text = '';
  }

  ngOnInit(): void {
    this.cityService.getAllCities().subscribe(
      cities => {
        this.cities = cities;
      }
    );
  }

  search(event) {
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.cities.length; i++) {
      let city = this.cities[i];
      if (city.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(city);
      }
    }
    this.filteredCountries = filtered;
  }

  load(index) {
    this.loading[index] = true;
    setTimeout(() => this.loading[index] = false, 1000);
  }
}
