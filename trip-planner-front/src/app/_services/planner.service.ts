import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { PlannerDto } from "../_models/dto/plannerDto";
import { Planner } from "../_models/planner";

@Injectable({
    providedIn: 'root'
})
export class PlannerService {

    httpHeaders: HttpHeaders = new HttpHeaders({
        'Authorization': ''+sessionStorage.getItem("token"),
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      });
      

    constructor(private httpClient: HttpClient){
    }

   
    getAllPlanners():Observable<Planner[]>{
        let url = "http://localhost:8080/api/planners/user";
        console.log("SERVID: " + sessionStorage.getItem("token"));
        console.log(this.httpHeaders.get('Authorization'))  ;
        return this.httpClient.get<Planner[]>(url, {headers: this.httpHeaders});     
    }

    postInitialPlanner(planner: Planner): Observable<Planner>{     
        let url = "http://localhost:8080/api/planner/new";
        return this.httpClient.post<Planner>(url, planner);
    }

    updatePlanner(id: number, plannerDto : PlannerDto):Observable<Planner>{    
    let url = "http://localhost:8080/api/edit/planner/" + id;
    return this.httpClient.put<Planner>(url, plannerDto, {headers: this.httpHeaders});
    }

    getPlannerById(id:number):Observable<Planner>{
        let url = "http://localhost:8080/api/planner/" + id;
        return this.httpClient.get<Planner>(url);
    }


}