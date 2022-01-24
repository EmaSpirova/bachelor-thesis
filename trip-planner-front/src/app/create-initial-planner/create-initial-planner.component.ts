import { PlatformModule } from '@angular/cdk/platform';
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

  plannerDto: PlannerDto;

  constructor( private ref: DynamicDialogRef) {
                this.plannerDto = new PlannerDto();
              }

  ngOnInit(): void {
    this.plannerDto = new PlannerDto();
  }

  onFormSubmitPlanner(plannerDto){
    this.ref.close(plannerDto);
    window.location.reload();
  }


}