import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Planner } from '../_models/planner';
import { LocationService } from '../_services/location.service';
import { AddLocationToPlannerPanelComponent } from './add-location-to-planner-panel/add-location-to-planner-panel.component';
import { Location } from '../_models/location';
import { PlannerLocationDto } from '../_models/dto/plannerLocationDto';


@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css'],
  providers: [DialogService, MessageService]
})
export class LocationComponent implements OnInit {

  categoryIds: string;
  cityId: number;
  companionId: number;
  lengthOfStay: number;
  listLocations: any[];
  cityOption: boolean = false;
  regionOption: boolean = false;
  regionId: number;
  locationId: number;
  plannerLocationDto: PlannerLocationDto;
  ref: DynamicDialogRef;
  locationIdsPlanner: number[];


  constructor(private route: ActivatedRoute, private locationService: LocationService,
    private router: Router, private dialogService: DialogService, private messageService: MessageService) {
    this.cityId = 1;
    this.companionId = 1;
    this.lengthOfStay = 1;
    this.categoryIds = '';
    this.listLocations = [];
    this.regionId = 1;
    this.locationId = 1;
    this.ref = new DynamicDialogRef();
    this.plannerLocationDto = new PlannerLocationDto();
    this.locationIdsPlanner = [];
  }

  ngOnInit(): void {

    this.route.queryParams
      .subscribe(params => {
        console.log(params);
        this.cityId = params.cityId;
        this.regionId = params.regionId;
        this.companionId = params.companionId;
        this.lengthOfStay = params.lengthOfStay;
        this.categoryIds = params.categoryIds;
      }
      );

    if (this.route.snapshot.queryParams['cityId']) {
      this.locationService.getLocationsFromCity(this.cityId, this.companionId, this.lengthOfStay, this.categoryIds).subscribe(
        result => {
          console.log(result);
          this.listLocations = result;
        }
      );
    } else
      if (this.route.snapshot.queryParams['regionId']) {
        console.log("I am in region console");
        this.locationService.getLocationsFromRegion(this.regionId, this.companionId, this.lengthOfStay, this.categoryIds).subscribe(
          result => {
            console.log(result);
            this.listLocations = result;
          }
        );
      }

  }

  onClickSeeDetails(id: number) {
    this.router.navigate(['location'], { queryParams: { id: id } });
  }

  show(location: Location) {
    console.log(location.id);
    this.ref = this.dialogService.open(AddLocationToPlannerPanelComponent, {
      header: 'Choose a Planner',
      width: '70%',
      contentStyle: { "max-height": "500px", "overflow": "auto" },
      baseZIndex: 10000
    });

    this.ref.onClose.subscribe((planner: Planner) => {
      this.plannerLocationDto.locationId = location.id;
      this.plannerLocationDto.plannerId = planner.id;
      console.log("LOC ID: " + this.plannerLocationDto.locationId);
      console.log("PLANNER ID: " + this.plannerLocationDto.plannerId);

      this.locationService.getAllLocationIdsForPlanner(planner.id).subscribe(
        lid => {
          if (lid.length == 0) {
            this.locationService.postLocationToPlanner(this.plannerLocationDto).subscribe(
              data => {
                console.log(data);
              }
            );
            this.messageService.add({ severity: 'success', summary: 'Location ' + location.name + ' has been added to planner: ', detail: planner.name });

          } else if (lid.length > 0) {
            if (lid.indexOf(this.plannerLocationDto.locationId) !== -1) {
              console.log("LOKACIJATA VEKE JA IMA VO PLANEROT");
              this.messageService.add({ severity: 'error', summary: 'Location ' + location.name + ' already exists in the planner.' });
            } else {
              this.locationService.postLocationToPlanner(this.plannerLocationDto).subscribe(
                data => {
                  console.log(data);
                }
              );
              this.messageService.add({ severity: 'success', summary: 'Location ' + location.name + ' has been added to planner: ', detail: planner.name });
            }

          }
        }
      );
    });
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }

  onClickBackToMyPlanners() {
    this.router.navigate(['planners']);
  }


}
