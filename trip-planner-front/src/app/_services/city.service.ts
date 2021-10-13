import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { City } from "../_models/city";

@Injectable({
    providedIn:'root'
})

export class CityService{
    constructor(private httpClient: HttpClient){
    }

    getAllCities():Observable<City[]>{
        let url = "http://localhost:8080/api/cities";
        return this.httpClient.get<City[]>(url);
    }
}