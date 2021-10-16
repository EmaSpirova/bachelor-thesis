import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CityService } from "./city.service";
import { CountryService } from "./country.service";
import { forkJoin  } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class PlaceService{

    constructor(private httpClient : HttpClient, private cityService: CityService, private countryService : CountryService){}
    
    
}