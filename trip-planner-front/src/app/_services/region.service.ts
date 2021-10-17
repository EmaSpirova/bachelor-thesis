import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Region } from "../_models/region";

@Injectable({
    providedIn: 'root'
})
export class RegionService{
    constructor(private httpClient: HttpClient){
    }

    getAllRegions():Observable<Region[]>{
        let url = "http://localhost:8080/api/regions";
        return this.httpClient.get<Region[]>(url);
    }
}