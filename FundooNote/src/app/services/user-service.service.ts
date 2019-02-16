import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../model/user.model';
import { LoginModel } from '../model/login.model';

@Injectable({
  providedIn: 'root'
})

export class UserServiceService {

  url: String  = 'http://localhost:8080/user/';
  constructor(private http: HttpClient) { }

  public registerCall(user: User): any {
    console.log(user);
    return this.http.post<User>(this.url + 'register', user);
  }

  public loginCall(login: LoginModel): any {

    console.log(login);
    return this.http.post(this.url + 'login', login,
               { headers: new HttpHeaders().set( 'jwtToken' , '') , observe: 'response'});
  }



}
