import { Component, OnInit } from '@angular/core';
import { Planner } from '../_models/planner';
import { PlannerService } from '../_services/planner.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CreateInitialPlannerComponent } from '../create-initial-planner/create-initial-planner.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-planner',
  templateUrl: './planner.component.html',
  styleUrls: ['./planner.component.css']
})
export class PlannerComponent implements OnInit {

  planners: Planner[];
  plannerId: number;

  constructor(private plannerService: PlannerService, public dialog: MatDialog, private router: Router) { 
    this.planners = [];
    this.plannerId = 1;
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
  
  onClickEditPlanner(id: number){
    console.log(id);
   
         
          this.router.navigate(['edit/planner/', this.plannerId])
    
  }
}
