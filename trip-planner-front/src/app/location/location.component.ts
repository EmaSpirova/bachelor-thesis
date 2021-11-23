import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationService } from '../_services/location.service';
import { AddLocationToPlannerPanelComponent } from './add-location-to-planner-panel/add-location-to-planner-panel.component';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {

  form: FormGroup;
  categoryIds: string;
  cityId: number;
  companionId: number;
  lengthOfStay: number;
  listLocations: any[];
  cityOption: boolean = false;
  regionOption: boolean = false;
  regionId: number;
  locationId: number;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private locationService: LocationService,
    private router: Router, private dialog: MatDialog) {
    this.form = fb.group({
      title: fb.control('initial value', Validators.required)
    });
    this.cityId = 1;
    this.companionId = 1;
    this.lengthOfStay = 1;
    this.categoryIds = '';
    this.listLocations = [];
    this.regionId = 1;
    this.locationId = 1;
  }

  ngOnInit(): void {

    this.route.queryParams
      .subscribe(params => {
        console.log(params);
        this.cityId = params.cityId;
        this.regionId = params.regionId;
        this.companionId = params.companionId;
        this.lengthOfStay = params.lengthOfStay;
        this.categoryIds = params.categoryIds;
      }
      );

    if (this.route.snapshot.queryParams['cityId']) {
      this.locationService.getLocationsFromCity(this.cityId, this.companionId, this.lengthOfStay, this.categoryIds).subscribe(
        result => {
          console.log(result);
          this.listLocations = result;
        }
      );
    } else
      if (this.route.snapshot.queryParams['regionId']) {
        console.log("I am in region console");
        this.locationService.getLocationsFromRegion(this.regionId, this.companionId, this.lengthOfStay, this.categoryIds).subscribe(
          result => {
            console.log(result);
            this.listLocations = result;
          }
        );
      }

  }

  openDialogSave(locationId){
   // console.log(locationId);
      const dialogRef = this.dialog.open(AddLocationToPlannerPanelComponent, {
        width: '250px',
        data: {}
      });
      this.router.navigate(['locations'], {queryParams: {regionId: this.regionId, companionId: this.companionId, lengthOfStay: this.lengthOfStay, categoryIds: this.categoryIds, locationId: locationId}});
      
  }

  onClickSeeDetails(id: number){
    this.router.navigate(['location'], {queryParams: {id: id}});
  }
}
