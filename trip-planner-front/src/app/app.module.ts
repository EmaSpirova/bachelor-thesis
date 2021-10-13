import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
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

@NgModule({
  declarations: [
    AppComponent,
    PlannerComponent,
    LocationComponent
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
    MatGridListModule
  ],
  providers: [
    CategoryService,
    PlannerService
  ],
  bootstrap: [AppComponent]
  
})
export class AppModule { }
