import { Component, OnInit } from '@angular/core';
import { Planner } from '../_models/planner';
import { PlannerService } from '../_services/planner.service';

@Component({
  selector: 'app-planner',
  templateUrl: './planner.component.html',
  styleUrls: ['./planner.component.css']
})
export class PlannerComponent implements OnInit {

  planners: Planner[];
  constructor(private plannerService: PlannerService) { 
    this.planners = [];
  }

  ngOnInit(): void {
    this.plannerService.getAllPlanners().subscribe(
      data => {
        this.planners = data;
      }
    );
  }

}
