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

  categories: Category[];
  companions: Companion[];
  constructor(private categoryService: CategoryService, private companionService : CompanionService) {
    this.categories = [];
    this.companions = [];
   }
   
  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe(
      data => {
        this.categories = data;
        console.log(data);
      }
    );

    this.companionService.getAllCompanions().subscribe(
      data => {
        this.companions = data;
      }
    );
  }
}
