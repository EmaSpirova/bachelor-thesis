import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './homepage/login/login.component';
import { LocationDetailsComponent } from './location/location-details/location-details.component';
import { LocationComponent } from './location/location.component';
import { LocationsFormComponent } from './locations-form/locations-form.component';
import { EditPlannerComponent } from './planner/edit-planner/edit-planner.component';
import { PlannerComponent } from './planner/planner.component';

const routes: Routes = [
  {path: 'planners', component: PlannerComponent},
  {path: 'form', component: LocationsFormComponent},
  {path: 'edit/planner/:id', component: EditPlannerComponent},
  {path: 'locations', component: LocationComponent},
  {path: '', component: HomepageComponent},
  {path: '', component:LoginComponent},
  {path: 'location', component: LocationDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
