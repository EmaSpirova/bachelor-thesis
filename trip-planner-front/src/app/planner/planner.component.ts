import { Component, OnInit } from '@angular/core';
import { Planner } from '../_models/planner';
import { PlannerService } from '../_services/planner.service';
import { CreateInitialPlannerComponent } from '../create-initial-planner/create-initial-planner.component';
import { Router } from '@angular/router';
import { PlannerDto } from '../_models/dto/plannerDto';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { UserDto } from '../_models/dto/userDto';


@Component({
  selector: 'app-planner',
  templateUrl: './planner.component.html',
  styleUrls: ['./planner.component.css'],
  providers: [DialogService, MessageService]
})
export class PlannerComponent implements OnInit {

  planners: Planner[];
  plannerDto: PlannerDto;
  ref: DynamicDialogRef;
  user: UserDto;
  userDisplayName = '';
  status = '';

  constructor(private plannerService: PlannerService, private router: Router,
    private dialogService: DialogService, private primengConfig: PrimeNGConfig, private messageService: MessageService) {
    this.planners = [];
    this.plannerDto = new PlannerDto();
    this.ref = new DynamicDialogRef;
    this.user = new UserDto();
  }

  ngOnInit(): void {

    this.primengConfig.ripple = true;
    let name1: string = sessionStorage.getItem("username") as string;
    this.userDisplayName = name1;
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
    this.ref.onClose.subscribe((plannerDto: PlannerDto) => {
      if (plannerDto) {
        console.log("NOVOKREIRANIOT NAME NA PLANNER: " + plannerDto.name);
        this.plannerService.postInitialPlanner(plannerDto).subscribe(
          data => {
            console.log(data);
          },
          error => console.log('oops', error)
        );
        this.messageService.add({ severity: 'success', summary: 'The planner: ' + plannerDto.name + ' has been created.' });
      }

    });

  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }

  onClickLogout() {
    sessionStorage.removeItem("token");
    console.log("SESSION HAS ENDED, THE USER IS LOGGED OUT" + sessionStorage.getItem("token"));
    this.router.navigate(['']);
  }

  onDeletePlanner(id: number) {
    console.log("DELETE KOCHE: " + id);
    this.plannerService.deletePlannerById(id).subscribe(
      (data) => {
        console.log(data);
      },
      (error) => console.log('error', error)
    );
    window.location.reload();
  }
}
