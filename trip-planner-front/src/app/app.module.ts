import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CategoryService } from './_services/cateogry.service';
import { PlannerComponent } from './planner/planner.component';
import { LocationComponent } from './location/location.component';
import { MatIconModule } from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatChipsModule} from '@angular/material/chips';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDialogModule} from '@angular/material/dialog';
import {MatBadgeModule} from '@angular/material/badge';
import {MatDividerModule} from '@angular/material/divider';
import {MatCardModule} from '@angular/material/card';
import { PlannerService } from './_services/planner.service';
import { MatButtonModule } from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import { CreateInitialPlannerComponent } from './create-initial-planner/create-initial-planner.component';
import { LocationsFormComponent } from './locations-form/locations-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { EditPlannerComponent } from './planner/edit-planner/edit-planner.component';
import { DetailPlannerComponent } from './planner/detail-planner/detail-planner.component';
import { AddLocationToPlannerPanelComponent } from './location/add-location-to-planner-panel/add-location-to-planner-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    PlannerComponent,
    LocationComponent,
    CreateInitialPlannerComponent,
    LocationsFormComponent,
    EditPlannerComponent,
    DetailPlannerComponent,
    AddLocationToPlannerPanelComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatBadgeModule,
    MatIconModule,
    MatInputModule,
    MatChipsModule,
    MatTabsModule,
    MatDialogModule,
    MatDividerModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatSelectModule
    
  ],
  providers: [
    CategoryService,
    PlannerService
    
  ],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
  
})
export class AppModule { }
