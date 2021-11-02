import { ResourceLoader } from '@angular/compiler';
import { Route } from '@angular/compiler/src/core';
import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PlannerDto } from '../_models/dto/plannerDto';
import { Planner } from '../_models/planner';
import { PlannerService } from '../_services/planner.service';

@Component({
  selector: 'app-create-initial-planner',
  templateUrl: './create-initial-planner.component.html',
  styleUrls: ['./create-initial-planner.component.css']
})
export class CreateInitialPlannerComponent implements OnInit {

  planner: Planner;
  planners: Planner[];
  locations : Location[];
  plannerDto: PlannerDto;

  constructor(public dialogRef: MatDialogRef<CreateInitialPlannerComponent>,
              private plannerService : PlannerService, private router : Router) {
                this.planner = new Planner;
                this.planners = [];
                this.locations = [];
                this.plannerDto = new PlannerDto();
              }

  ngOnInit(): void {
    this.planner = new Planner();
    this.plannerDto = new PlannerDto();
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
  
  onFormSubmitPlanner(form: NgForm){
   console.log(this.planner);
      this.plannerService.postInitialPlanner(this.plannerDto).subscribe(
        data=>{
          console.log(data);
          this.router.navigate(['planner']);
        },
        error => console.log('oops', error)
     );
     window.location.reload();
  }


}