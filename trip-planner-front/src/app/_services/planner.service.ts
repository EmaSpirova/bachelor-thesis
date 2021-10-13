import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Planner } from "../_models/planner";

@Injectable({
    providedIn: 'root'
})
export class PlannerService{
    constructor(private httpClient: HttpClient){
    }
    getAllPlanners():Observable<Planner[]>{
        let url = "http://localhost:8080/api/planners";
        return this.httpClient.get<Planner[]>(url);
    }
}