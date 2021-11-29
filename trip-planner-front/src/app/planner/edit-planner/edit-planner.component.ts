import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PlannerDto } from 'src/app/_models/dto/plannerDto';
import { Location } from 'src/app/_models/location';
import { Planner } from 'src/app/_models/planner';
import { LocationService } from 'src/app/_services/location.service';
import { PlannerService } from 'src/app/_services/planner.service';

@Component({
  selector: 'app-edit-planner',
  templateUrl: './edit-planner.component.html',
  styleUrls: ['./edit-planner.component.css']
})
export class EditPlannerComponent implements OnInit {

  planner: Planner;
  planners: Planner[];
  form: FormGroup;
  plannerDto: PlannerDto;
  id: number;
  locations: Location[];


  constructor(private router: Router, private route: ActivatedRoute, private fb: FormBuilder, private plannerService: PlannerService,
    private locationService : LocationService) {
    this.planner = new Planner();
    this.planners = [];
    this.form = fb.group({
      title: fb.control('initial value', Validators.required)
    });
    this.plannerDto = new PlannerDto();
    this.id = 1;
    this.locations = [];
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.form = this.fb.group({
      name: [''],
      description: [''],
      locationList: []
    });

    this.plannerService.getPlannerById(this.id)
      .pipe()
      .subscribe(x => this.form.patchValue(x));

    this.locationService.getLocationsForPlanner(this.id).subscribe(
      data => {
          this.locations = data;
      }
    );
    }
 
  onSubmit() {
    this.updatePlanner();

  }

  onClickAddLocation() {
    this.router.navigate(['form']);
  }

  private updatePlanner() {
    this.plannerService.updatePlanner(this.id, this.form.value)
      .pipe()
      .subscribe({
        next: () => {
          this.router.navigate(['planners']);
        },
        error: error => {
          console.log("error");
        }
      });
  }

  onClickBack(){
    this.router.navigate(['planners']);
  }
}
