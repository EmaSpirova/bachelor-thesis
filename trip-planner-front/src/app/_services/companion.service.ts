import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Companion } from "../_models/companion";


@Injectable({
    providedIn: 'root'
})

export class CompanionService{
    constructor(private httpClient : HttpClient){
    }

    getAllCompanions():Observable<Companion[]>{
        let url  = "http://localhost:8080/api/companions";
        return this.httpClient.get<Companion[]>(url);
    }
}