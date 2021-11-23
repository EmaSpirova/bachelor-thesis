import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { PlannerLocationDto } from 'src/app/_models/dto/plannerLocationDto';
import { Location } from 'src/app/_models/location';
import { Planner } from 'src/app/_models/planner';
import { LocationService } from 'src/app/_services/location.service';
import { PlannerService } from 'src/app/_services/planner.service';

@Component({
  selector: 'app-add-location-to-planner-panel',
  templateUrl: './add-location-to-planner-panel.component.html',
  styleUrls: ['./add-location-to-planner-panel.component.css']
})
export class AddLocationToPlannerPanelComponent implements OnInit {

  planners: Planner[];
  location: Location;
  plannerId: number;
  locationId: number;
  plannerLocationDto: PlannerLocationDto;
  locationsInPlanner: Location[];


  constructor(private dialogRef: MatDialogRef<AddLocationToPlannerPanelComponent>, private plannerService: PlannerService,
    private locationService: LocationService, private route: ActivatedRoute) {
    this.planners = [];
    this.location = new Location;
    this.plannerId = 1;
    this.locationId = 1;
    this.plannerLocationDto = new PlannerLocationDto();
    this.locationsInPlanner = [];
  }

  ngOnInit(): void {
    this.plannerService.getAllPlanners().subscribe(
      data => {
        this.planners = data;
      }
    );


    this.route.queryParams
      .subscribe(params => {
        this.locationId = params.locationId;
      }
      );
  }

  onCancelClick(): void {
    this.dialogRef.close();

  }

  onFormSavePlanner(plannerId: number) {
    console.log("PLANNER ID: " + plannerId);
    console.log("LOC ID "+ this.locationId);
    this.plannerLocationDto.locationId = this.locationId;
    this.plannerLocationDto.plannerId = plannerId;
    /*
    this.locationService.postLocationToPlanner(this.plannerLocationDto).subscribe(
      data => {
        console.log(data);
      }
    );
    */

   // window.location.reload();
    }

}
