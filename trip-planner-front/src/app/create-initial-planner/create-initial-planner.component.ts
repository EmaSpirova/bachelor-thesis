import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { PlannerDto } from '../_models/dto/plannerDto';
import { Planner } from '../_models/planner';

@Component({
  selector: 'app-create-initial-planner',
  templateUrl: './create-initial-planner.component.html',
  styleUrls: ['./create-initial-planner.component.css']
})
export class CreateInitialPlannerComponent implements OnInit {

  planner: Planner;
  plannerDto: PlannerDto;

  constructor( private ref: DynamicDialogRef) {
                this.planner = new Planner;
                this.plannerDto = new PlannerDto();
              }

  ngOnInit(): void {
    this.planner = new Planner();
    this.plannerDto = new PlannerDto();
  }

  onFormSubmitPlanner(planner){
    this.ref.close(planner);
    window.location.reload();
  }


}