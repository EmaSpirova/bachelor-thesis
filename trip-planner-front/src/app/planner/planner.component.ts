import { Component, OnInit } from '@angular/core';
import { Planner } from '../_models/planner';
import { PlannerService } from '../_services/planner.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CreateInitialPlannerComponent } from '../create-initial-planner/create-initial-planner.component';
import { Router } from '@angular/router';
import { PlannerDto } from '../_models/dto/plannerDto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-planner',
  templateUrl: './planner.component.html',
  styleUrls: ['./planner.component.css']
})
export class PlannerComponent implements OnInit {

  planners: Planner[];
  plannerDto: PlannerDto;
  editForm: FormGroup;



  constructor(private plannerService: PlannerService, public dialog: MatDialog, private router: Router,
    private fb : FormBuilder) { 
    this.planners = [];
    this.plannerDto = new PlannerDto();
    this.editForm = fb.group({
      title: fb.control('initial value', Validators.required)
  });
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
  
  onClickEditPlannerGet(id: number){
    console.log(id);
        this.plannerService.getPlannerById(id).subscribe(
            data => {
              
              this.router.navigate(['edit/planner/', id])
            }
     );
    
  }

  
}
