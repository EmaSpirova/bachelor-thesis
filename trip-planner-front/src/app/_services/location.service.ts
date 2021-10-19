import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class LocationService{
    constructor(private httpClient : HttpClient){}

    getLocationsFromCity(cityId: number, companionId: number, lengthOfStay: number, categoryIds: string): Observable<Object[]>{
        let url = "http://localhost:8080/api/city/locations";
        return this.httpClient.get<Location[]>(url + '?cityId=' + cityId + '&companionId=' + companionId + '&lengthOfStay=' + lengthOfStay + '&categoryIds='+ categoryIds);
    }

    getLocationsFromRegion(regionId: number, companionId: number, lengthOfStay: number, categoryIds: string):Observable<Object[]>{
        let url = "http://localhost:8080/api/region/locations";
        return this.httpClient.get<Location[]>(url + '?regionId=' + regionId + '&companionId=' + companionId + '&lengthOfStay=' + lengthOfStay + '&categoryIds='+ categoryIds);
    }
}