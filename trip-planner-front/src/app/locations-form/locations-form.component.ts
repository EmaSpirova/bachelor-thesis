import { Component, Injectable, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
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

@Component({
  selector: 'app-locations-form',
  templateUrl: './locations-form.component.html',
  styleUrls: ['./locations-form.component.css']
})
export class LocationsFormComponent implements OnInit {

  myControl = new FormControl();
  cities: City[];
  countries: Country[];
  companions: Companion[];
  categories: Category[];
  filteredOptions: Observable<City[]>;
  disableSelect = new FormControl(false);

  constructor(private cityService : CityService, private countryService : CountryService,
              private companionService : CompanionService, private categoryService : CategoryService){
    this.filteredOptions = new Observable<City[]>();
    this.cities = [];
    this.countries = [];
    this.companions = [];
    this.categories = [];
  }
  
  ngOnInit() :void {
    this.filteredOptions = this.myControl.valueChanges
    .pipe(
      startWith(''),
      switchMap(val => {
        return this.filter(val || '')
      })       
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

 toggleSelection(chip: MatChip){
   chip.toggleSelected();
 }

}
