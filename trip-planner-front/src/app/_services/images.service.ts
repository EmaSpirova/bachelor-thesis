import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Images } from "../_models/images";

@Injectable({
    providedIn:'root'
})
export class ImagesService{
    constructor(private httpClient: HttpClient){
    }

    getAllImagesForLocation(locationId : number):Observable<Images[]>{
        let url = "http://localhost:8080/api/images";
        return this.httpClient.get<Images[]>(url + "?locationId=" + locationId);
    }
}