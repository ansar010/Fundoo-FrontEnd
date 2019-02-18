import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../model/user.model';
import { LoginModel } from '../model/login.model';
import { ForgetPassword } from '../model/forgetP.model';
import { ResetPassword } from '../model/resetP.model';

const httpOptions = {
  headers: new HttpHeaders().set('Content-Type', 'application/json')
    .set('Access-Control-Allow-Origin', '*')

};

@Injectable({
  providedIn: 'root'
})


export class UserServiceService {

  url: String = 'http://192.168.0.134:8080/user/';
  constructor(private http: HttpClient) { }

  public registerCall(user: User): any {
    console.log(user);
    return this.http.post<User>(this.url + 'register', user);
  }

  public loginCall(login: LoginModel): any {

    console.log(login);
    return this.http.post(this.url + 'login', login,
      { headers: new HttpHeaders().set('jwtToken', ''), observe: 'response' });
  }

  public forgetPasswordCall(forgetpasswordModel: ForgetPassword): any {

    // return this.http.post<ForgetPassword>(this.url + 'forgetPassword', forgetpasswordModel,
    //         { headers: new HttpHeaders().set('jwtToken', ''), observe: 'response' });

    return this.http.post<ForgetPassword>(this.url + 'forgetpassword', forgetpasswordModel, httpOptions);
  }
  public resetPasswordCall(resetpasswordModel: ResetPassword, token: string): any {

    // return this.http.post<ForgetPassword>(this.url + 'forgetpassword', forgetpasswordModel,
    //         { headers: new HttpHeaders().set('jwtToken', ''), observe: 'response' });

    return this.http.post<ResetPassword>(this.url + 'resetpassword/' + token, resetpasswordModel, httpOptions);
  }

}
