import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Country } from "../_models/country";

@Injectable({
    providedIn:'root'
})

export class CountryService{
    constructor(private httpClient : HttpClient){
    }

    getAllCountries():Observable<Country[]>{
        let url = "http://localhost:8080/api/countries";
        return this.httpClient.get<Country[]>(url);
    }
}