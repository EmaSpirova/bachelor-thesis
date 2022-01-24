import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { LoginRequest } from "../_models/dto/loginRequest";
import { UserDto } from "../_models/dto/userDto";
import { User } from "../_models/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Headers': 'Content-Type',

  });

  constructor(private httpClient: HttpClient) {

  }

  registerUser(user: UserDto): Observable<User> {
    let url = "http://localhost:8080/api/users/register";
    return this.httpClient.post<User>(url, user, { headers: this.headers });
  }

  authenticateUser(loginResult: LoginRequest) {
    let url = "http://localhost:8080/api/users/login";
    return this.httpClient.post<any>(url, loginResult)
      .pipe(
        map(userData => {
          sessionStorage.setItem("username", loginResult.username);
          let tokenStr = userData.token;
          sessionStorage.setItem("token", tokenStr);
          return userData;
        })
      );
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem("username");
    let token = sessionStorage.getItem("token");
    return !(user === null);
  }

  getAllUsernames() {
    let url = "http://localhost:8080/api/users/usernames";
    return this.httpClient.get<string[]>(url);
  }

  getPassword(loginRequest : LoginRequest){
    let url="http://localhost:8080/api/users/password";
    const options = {
      
      body: {
          "username": loginRequest.username
          
      } 
  }
    return this.httpClient.request('get', url, options);
  }

}
