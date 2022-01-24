import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CategoryService } from './_services/cateogry.service';
import { PlannerComponent } from './planner/planner.component';
import { LocationComponent } from './location/location.component';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { PlannerService } from './_services/planner.service';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { CreateInitialPlannerComponent } from './create-initial-planner/create-initial-planner.component';
import { LocationsFormComponent } from './locations-form/locations-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { EditPlannerComponent } from './planner/edit-planner/edit-planner.component';
import { AddLocationToPlannerPanelComponent } from './location/add-location-to-planner-panel/add-location-to-planner-panel.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AccordionModule } from 'primeng/accordion';     //accordion and accordion tab
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { TabViewModule } from 'primeng/tabview';
import { LocationDetailsComponent } from './location/location-details/location-details.component';
import { GalleriaModule } from 'primeng/galleria';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { MessageService, SharedModule, ConfirmationService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { PaginatorModule } from 'primeng/paginator';
import { CardModule } from 'primeng/card';
import { RegisterComponent } from './homepage/register/register.component';
import { LoginComponent } from './homepage/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';
import { ExploreComponent } from './explore/explore.component';
import {AutoCompleteModule} from 'primeng/autocomplete';
import { ExploreResultComponent } from './explore/explore-result/explore-result.component';
import {RatingModule} from 'primeng/rating';
import { CustomValidators } from './providers/CustomValidators';

@NgModule({
  declarations: [
    AppComponent,
    PlannerComponent,
    LocationComponent,
    CreateInitialPlannerComponent,
    LocationsFormComponent,
    EditPlannerComponent,
    AddLocationToPlannerPanelComponent,
    HomepageComponent,
    LocationDetailsComponent,
    RegisterComponent,
    LoginComponent,
    ExploreComponent,
    ExploreResultComponent
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
    MatSelectModule,
    AccordionModule,
    CarouselModule,
    ButtonModule,
    ToastModule,
    TabViewModule,
    GalleriaModule,
    DynamicDialogModule,
    MatIconModule,
    SharedModule,
    MatDialogModule,
    TableModule,
    MessagesModule,
    MessageModule,
    InputTextModule,
    RippleModule,
    FormsModule,
    PaginatorModule,
    CardModule,
    AutoCompleteModule,
    RatingModule
  ],


  providers: [
    CategoryService,
    PlannerService,
    {
      provide: MatDialogRef,
      useValue: {},

    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    DialogService,
    MessageService,
    ConfirmationService,
    AuthGuard
  ],

  entryComponents: [
    AddLocationToPlannerPanelComponent
  ],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA],

})
export class AppModule { }
