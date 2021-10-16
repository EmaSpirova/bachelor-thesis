import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-create-initial-planner',
  templateUrl: './create-initial-planner.component.html',
  styleUrls: ['./create-initial-planner.component.css']
})
export class CreateInitialPlannerComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CreateInitialPlannerComponent>) {}

  ngOnInit(): void {
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

}
