import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatChip } from '@angular/material/chips';
import { Category } from 'src/app/_models/category';
import { City } from 'src/app/_models/city';
import { Companion } from 'src/app/_models/companion';
import { LocationDto } from 'src/app/_models/dto/locationDto';
import { Region } from 'src/app/_models/region';
import { CategoryService } from 'src/app/_services/cateogry.service';
import { CityService } from 'src/app/_services/city.service';
import { CompanionService } from 'src/app/_services/companion.service';
import { LocationService } from 'src/app/_services/location.service';
import { RegionService } from 'src/app/_services/region.service';

@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.css']
})
export class AddLocationComponent implements OnInit {
    firstFormGroup: FormGroup;
    secondFormGroup: FormGroup;
    thirdFormGroup : FormGroup;
    isEditable = false;
    categories : Category[] = [];
    companions : Companion[] = [];
    cities : City[] = [];
    cityId : number = 0;
    regionId : number = 0;
    regions : Region[] = [];
    priority: string = '';
    name: string = '';
    desc: string = '';
    address: string = '';
    duration: number = 0;
    trivia: string = '';
    isCompleted = false;
    locationDto : LocationDto = new LocationDto();
    companionForm = new FormControl();
    chipsSeletion: number[] = [];
    toggle = true;
    isCompletedSecond = false;
  
    priorities: any[] = [
      {value: 'high', viewValue: 'High'},
      {value: 'medium', viewValue: 'Medium'},
      {value: 'low', viewValue: 'Low'},
    ];
  
    constructor(private fb: FormBuilder, private categoryService : CategoryService, 
      private companionService : CompanionService, private cityService : CityService, private regionService : RegionService,
      private locationService : LocationService) {
        this.firstFormGroup = fb.group({
            title: fb.control('initial value', Validators.required)
          });
          this.secondFormGroup = fb.group({
            title: fb.control('initial value', Validators.required)
          });
          this.thirdFormGroup = fb.group({
            title: fb.control('initial value', Validators.required)

          })
    }
  
    ngOnInit() {
      this.firstFormGroup = this.fb.group({
        name: ['', Validators.required],
        desc: ['', Validators.required],
        address: ['', Validators.required],
        priority: ['', Validators.required],
        trivia: ['', Validators.required],
        duration: ['', Validators.required],
      });

      this.secondFormGroup = this.fb.group({
        secondCtrl: ['', Validators.required],
      });

      this.categoryService.getAllCategories().subscribe(
        data => {
          this.categories = data;
        }
      );
  
      this.companionService.getAllCompanions().subscribe(
        data => {
          this.companions = data;
        }
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
    }

    submitLocation(){
      this.locationDto.name = this.name;
      this.locationDto.description = this.desc;
      this.locationDto.address = this.address;
      this.locationDto.duration = this.duration;
      this.locationDto.trivia = this.trivia;
      this.locationDto.priority = this.priority;
      this.locationDto.city = this.cityId;
      this.locationDto.region = this.regionId;
      if(this.name !== null && this.desc !== null && this.address !== null
        && this.trivia != null  && this.priority !== null && this.cityId !== 0 && this.regionId !== 0){
          this.isCompleted = true;        
          this.locationService.save(this.locationDto).subscribe(
            data => {
              console.log(data);
            }
          );  
         
      }   
    }

    toggleSelection(chip: MatChip, category: Category) {
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
    onClickSecondForm(){
      if(this.companionForm.value.length >= 1){
        this.isCompletedSecond = true;
      }
      console.log(this.companionForm.value.length)
    }
}
