import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class LocationService{
    constructor(private httpClient : HttpClient){}

    getAllPlaces(locationId: number, companionId: number, lengthOfStay: number, categoryIds: string): Observable<Object[]>{
        let url = "http://localhost:8080/api/trip/locations";
        return this.httpClient.get<Location[]>(url + '?locationId=' + locationId + '&companionId=' + companionId + '&lengthOfStay=' + lengthOfStay + '&categoryIds='+ categoryIds);
    }
}