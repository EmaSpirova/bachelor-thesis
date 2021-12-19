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

  constructor( private ref: DynamicDialogRef) {
                this.planner = new Planner;
              }

  ngOnInit(): void {
    this.planner = new Planner();
  }

  onFormSubmitPlanner(planner){
    this.ref.close(planner);
    window.location.reload();
  }


}