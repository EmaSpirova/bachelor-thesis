import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { PlannerDto } from "../_models/dto/plannerDto";
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

    postInitialPlanner(plannerDto: PlannerDto): Observable<Object>{     
        let url = "http://localhost:8080/api/planner/new";
        return this.httpClient.post<Planner>(url, plannerDto);
    }

    updatePlanner(id: number):Observable<Planner>{    
    let url = "http://localhost:8080/api/edit/planner/" + id;
    return this.httpClient.put<Planner>(url, null);
    }
}