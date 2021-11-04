import { Component, Injectable, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import {map, startWith, switchMap} from 'rxjs/operators';
import {forkJoin, Observable} from 'rxjs';
import { CityService } from '../_services/city.service';
import { City } from '../_models/city';
import { Country } from '../_models/country';
import { CountryService } from '../_services/country.service';
import { Companion } from '../_models/companion';
import { CompanionService } from '../_services/companion.service';
import { Category } from '../_models/category';
import { CategoryService } from '../_services/cateogry.service';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { MatChip } from '@angular/material/chips';
import { LocationService } from '../_services/location.service';
import { Region } from '../_models/region';
import { RegionService } from '../_services/region.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-locations-form',
  templateUrl: './locations-form.component.html',
  styleUrls: ['./locations-form.component.css']
})
export class LocationsFormComponent implements OnInit {

  myControl = new FormControl();
  cities: City[];
  regions: Region[];
  companions: Companion[];
  categories: Category[];
  filteredOptions: Observable<City[]>;
  disableSelect = new FormControl(false);
  chipsSeletion: number[];
  categoryIds: string;
  locationId: number;
  regionId: number;
  cityId: number;
  companionId: number;
  lengthOfStay: number;
  cityOption: boolean = false;
  regionOption: boolean = false;
  value:number;
  max: number;
  toggle = true;
  status = 'Enable';

  constructor(private cityService : CityService, private regionService: RegionService,
              private companionService : CompanionService, private categoryService : CategoryService,
              private locationService: LocationService, private router : Router){
    this.filteredOptions = new Observable<City[]>();
    this.cities = [];
    this.regions = [];
    this.companions = [];
    this.categories = [];
    this.chipsSeletion = [];
    this.locationId = 0;
    this.companionId = 0;
    this.lengthOfStay = 1;
    this.categoryIds = '';
    this.regionId = 0;
    this.cityId = 0;
    this.value = 0;
    this.max = 30;
  }
  
  ngOnInit() :void {
    this.filteredOptions = this.myControl.valueChanges
    .pipe(
      startWith(''),
      switchMap(val => {
        return this.filter(val || '')
      })       
    );

    this.cityService.getAllCities().subscribe(
      data => {
        this.cities = data;
      }
    );

    this.regionService.getAllRegions().subscribe(
      data => {
        this.regions = data;
      }
    );

    this.categoryService.getAllCategories().subscribe(
      data => {
        this.categories = data;
      }
    );

    this.companionService.getAllCompanions().subscribe(
      data => {
        this.companions = data;
      }
    )
  }
  
  filter(val: string): Observable<City[]> {
    // call the service which makes the http-request
    return this.cityService.getAllCities()
      .pipe(
        map(response => response.filter(option => {
          return option.name.toLowerCase().indexOf(val.toLowerCase()) === 0
        }))
      )

  }

 toggleSelection(chip: MatChip, category: Category){
  chip.toggleSelected();
  
   if (this.chipsSeletion.length > 0) {
     if (this.chipsSeletion.indexOf(category.id) <= -1) {
       this.chipsSeletion.push(category.id);
     } else {
       const index = this.chipsSeletion.indexOf(category.id);
       this.chipsSeletion.splice(index, 1);
     }
   } else {
     this.chipsSeletion.push(category.id);
   }
   console.log(this.chipsSeletion);
 }


  createMyPlanner() {
    this.categoryIds = this.chipsSeletion.join(',');
    console.log(this.categoryIds);

    if (this.cityOption) {
      this.locationService.getLocationsFromCity(this.cityId, this.companionId, this.lengthOfStay, this.categoryIds).subscribe(
        result => {
          console.log(result);
          this.router.navigate(['locations']);
        }
      );
    } else if (this.regionOption) {
      this.locationService.getLocationsFromRegion(this.regionId, this.companionId, this.lengthOfStay, this.categoryIds).subscribe(
        result => {
          console.log(result);
          this.router.navigate(['locations']);
        }
      );
    }



  }

  chooseCityOption() {
    this.cityOption = true;
    this.regionOption = false;
  }
  chooseRegionOption() {
    this.regionOption = true;
    this.cityOption = false;
  }

  constraintMaxNumberDays() {
    if (this.value > this.max) {
      this.value = this.max;
    }
  }

}
