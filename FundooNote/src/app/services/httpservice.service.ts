import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders().set('Content-Type', 'application/json')
    .set('Access-Control-Allow-Origin', '*')
};

@Injectable({
  providedIn: 'root'
})
export class HttpserviceService {

  // private baseUrl = 'http://192.168.0.134:8080/user/';
  constructor(private http: HttpClient) { }

  public postRequest(url, data): any {
    return this.http.post(environment.baseUrl + url, data);
  }

  public putRequest(url, data): any {
    return this.http.put(environment.baseUrl + url, data, httpOptions);
  }

  public getRequest(url, data): any {

  }

}
