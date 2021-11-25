import { Component, OnInit } from '@angular/core';
import { Planner } from '../_models/planner';
import { PlannerService } from '../_services/planner.service';
import { CreateInitialPlannerComponent } from '../create-initial-planner/create-initial-planner.component';
import { Router } from '@angular/router';
import { PlannerDto } from '../_models/dto/plannerDto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PrimeNGConfig } from 'primeng/api';


@Component({
  selector: 'app-planner',
  templateUrl: './planner.component.html',
  styleUrls: ['./planner.component.css']
})
export class PlannerComponent implements OnInit {

  planners: Planner[];
  plannerDto: PlannerDto;
  editForm: FormGroup;
  ref: DynamicDialogRef;


  constructor(private plannerService: PlannerService, private router: Router,
    private fb: FormBuilder, private dialogService: DialogService, private primengConfig: PrimeNGConfig) {
    this.planners = [];
    this.plannerDto = new PlannerDto();
    this.editForm = fb.group({
      title: fb.control('initial value', Validators.required)
    });
    this.ref = new DynamicDialogRef;   
  }

  ngOnInit(): void {

    this.primengConfig.ripple = true;

    this.plannerService.getAllPlanners().subscribe(
      data => {
        this.planners = data;
      }
    );
  }

  onClickEditPlannerGet(id: number) {
    console.log(id);
    this.plannerService.getPlannerById(id).subscribe(
      data => {
        this.router.navigate(['edit/planner/', id]);
      }
    );

  }
  show() {
    this.ref = this.dialogService.open(CreateInitialPlannerComponent, {
      header: 'Create initial planner',
      width: '70%',
      contentStyle: { "max-height": "500px", "overflow": "auto" },
      baseZIndex: 10000
    });
  }
}
