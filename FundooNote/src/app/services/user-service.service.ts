import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})

export class UserServiceService {

  url: String  = 'http://localhost:8080/user/';
  constructor(private http: HttpClient) { }

  public registerCall(user: User): any {
    console.log(user);
    return this.http.post(this.url + 'register', user);
  }
}
