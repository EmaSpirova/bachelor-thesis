import { Component, OnInit } from '@angular/core';
import { Planner } from '../_models/planner';
import { PlannerService } from '../_services/planner.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CreateInitialPlannerComponent } from '../create-initial-planner/create-initial-planner.component';


@Component({
  selector: 'app-planner',
  templateUrl: './planner.component.html',
  styleUrls: ['./planner.component.css']
})
export class PlannerComponent implements OnInit {

  planners: Planner[];
  constructor(private plannerService: PlannerService, public dialog: MatDialog) { 
    this.planners = [];
  };
 
  openDialog(): void {
    const dialogRef = this.dialog.open(CreateInitialPlannerComponent, {
      width: '250px',
      data: {}
    });
  }
  
  ngOnInit(): void {
    this.plannerService.getAllPlanners().subscribe(
      data => {
        this.planners = data;
      }
    );
  }
  
}
