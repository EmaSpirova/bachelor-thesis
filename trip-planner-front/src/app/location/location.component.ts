import { Component, OnInit } from '@angular/core';
import { Category } from '../_models/category';
import { City } from '../_models/city';
import { Companion } from '../_models/companion';
import { Country } from '../_models/country';
import { CategoryService } from '../_services/cateogry.service';
import { CityService } from '../_services/city.service';
import { CompanionService } from '../_services/companion.service';
import { CountryService } from '../_services/country.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {

  constructor() {
    
   }
   
  ngOnInit(): void {
   
  }
}
