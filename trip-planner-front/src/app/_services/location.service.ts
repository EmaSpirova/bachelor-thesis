import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { PlannerLocationDto } from "../_models/dto/plannerLocationDto";
import { Location } from "../_models/location";

@Injectable({
    providedIn: 'root'
})
export class LocationService{
    constructor(private httpClient : HttpClient){}

    getLocationsFromCity(cityId: number, companionId: number, lengthOfStay: number, categoryIds: string): Observable<Location[]>{
        let url = "http://localhost:8080/api/city/locations";
        return this.httpClient.get<Location[]>(url + '?cityId=' + cityId + '&companionId=' + companionId + '&lengthOfStay=' + lengthOfStay + '&categoryIds='+ categoryIds);
    }

    getLocationsFromRegion(regionId: number, companionId: number, lengthOfStay: number, categoryIds: string):Observable<Object[]>{
        let url = "http://localhost:8080/api/region/locations";
        return this.httpClient.get<Location[]>(url + '?regionId=' + regionId + '&companionId=' + companionId + '&lengthOfStay=' + lengthOfStay + '&categoryIds='+ categoryIds);
    }

    postLocationToPlanner(plannerLocationDto : PlannerLocationDto) : Observable<Location>{
        let url = "http://localhost:8080/api/add-location";
        return this.httpClient.put<Location>(url, plannerLocationDto);
    }

    getLocationsForPlanner(plannerId : number) : Observable<Location[]>{
        let url = "http://localhost:8080/api/planner/locations";
        return this.httpClient.get<Location[]>(url + '?plannerId=' + plannerId);
    }

    getAllLocations() : Observable<Location[]> {
        let url = "http://localhost:8080/api/locations";
        return this.httpClient.get<Location[]>(url);
    }

    getWeekendGetaways() : Observable<Location[]>{
        let url = "http://localhost:8080/api/weekend";
        return this.httpClient.get<Location[]>(url);
    }

    getVillages() : Observable<Location[]>{
        let url = "http://localhost:8080/api/villages";
        return this.httpClient.get<Location[]>(url);
    }

    getLocation(id : number) :Observable<Location>{
        let url = "http://localhost:8080/api/location/" + id;
        return this.httpClient.get<Location>(url);
    }

    getAllLocationsForPlanner(id: number): Observable<Location[]>{
        let url = "http://localhost:8080/api/planner/locations";
        return this.httpClient.get<Location[]>(url + "?plannerId=" + id);
    }
    
}