import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocationsFormComponent } from './locations-form/locations-form.component';
import { EditPlannerComponent } from './planner/edit-planner/edit-planner.component';
import { PlannerComponent } from './planner/planner.component';

const routes: Routes = [
  {path: 'planners', component: PlannerComponent},
  {path: 'form', component: LocationsFormComponent},
  {path: 'edit/planner/:id', component: EditPlannerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
