import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Category } from "../_models/category";


@Injectable({
    providedIn: 'root'
})
export class CategoryService{
    constructor(private httpClient: HttpClient){
    }
    getAllCategories():Observable<Category[]>{
        let url = "http://localhost:8080/api/categories";
        return this.httpClient.get<Category[]>(url);
    }
}