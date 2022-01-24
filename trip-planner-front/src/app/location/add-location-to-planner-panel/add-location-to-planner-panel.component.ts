import { Component, OnInit } from '@angular/core';
import { Planner } from 'src/app/_models/planner';
import { PlannerService } from 'src/app/_services/planner.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';



@Component({
  selector: 'app-add-location-to-planner-panel',
  templateUrl: './add-location-to-planner-panel.component.html',
  styleUrls: ['./add-location-to-planner-panel.component.css']
})
export class AddLocationToPlannerPanelComponent implements OnInit {

  planners: Planner[];
  
  constructor(private plannerService: PlannerService, private ref: DynamicDialogRef) {
    this.planners = [];
  }

  ngOnInit(): void {

    this.plannerService.getAllPlanners().subscribe(
      planner => {
        this.planners = planner;
      }
    );
  }

  selectPlanner(planner: Planner) {
    this.ref.close(planner);
  }

}
