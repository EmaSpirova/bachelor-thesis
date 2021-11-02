import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Planner } from 'src/app/_models/planner';

@Component({
  selector: 'app-edit-planner',
  templateUrl: './edit-planner.component.html',
  styleUrls: ['./edit-planner.component.css']
})
export class EditPlannerComponent implements OnInit {

  planner: Planner;


  constructor(private router: Router) { 
    this.planner = new Planner();
  }

  ngOnInit(): void {
  }


  onClickSavePlanner(){
      this.router.navigate(['planners']);
  }

  onClickAddLocation(){
    this.router.navigate(['form']);
  }
}
