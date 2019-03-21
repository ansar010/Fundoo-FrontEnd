import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { NoteModel } from '../model/note.model';
import { notEqual } from 'assert';
import { Observable } from 'rxjs';
import { RecievNotes } from '../model/recievenote.model';
import { Label } from '../model/label.model';


// const httpOptions = {
//   headers: new HttpHeaders().set('Content-Type', 'application/json')
//     .set('Access-Control-Allow-Origin', '*')
// };

const httpOptions = {
  headers: new HttpHeaders({
    'content-type': 'application/json',
    'token': localStorage.getItem('token')
  })
};

@Injectable({
  providedIn: 'root'
})
export class HttpserviceService {

  // private baseUrl = 'http://192.168.0.134:8080/user/';
    //  private baseUrl = 'http://localhost:8080/user/';

  constructor(private http: HttpClient) { }

  public postRequest(url, data): any {
    return this.http.post(environment.baseUrl + url, data);
  }

  public putRequest(url, data): any {
    return this.http.put(environment.baseUrl + url, data, httpOptions);
  }
// --------------------------------------------------------------------------------------//
  
// Note Services
  public noteIDPutRequest(url, note: NoteModel): any {
   console.log("Note->"+note.id);
   
    return this.http.put(environment.baseUrl + url + note.id, '', httpOptions);
  }

  // public getRequest(url, data): any {
  // return this.http.get(environment.baseUrl + url,{header:new HttpHeaders().set('token':localStorage.getItem('token'))};

  // }

  // getRequest1(url): any {
  //   return this.http.get(this.baseUrl + url, {
  //     headers: new HttpHeaders().set('jwt_token', localStorage.getItem('token')),
  //     observe: 'response'
  //   });
  // }
  // public createNote(note: NoteModel) :any {
  //   console.log("local ",localStorage.getItem('jwtToken'))

  //  var httpOptions = {

  //     headers: new HttpHeaders({'Content-Type': 'application/json' ,
  //     'token':localStorage.getItem('jwtToken')}
  //     )};



  //   return this.http.post<NoteModel>(this.userUrl+'note',note,httpOptions);

  // }
  public notePostRequest(url, data): any {
    return this.http.post(environment.baseUrl + url, data,httpOptions);
  }

public noteListsGetRequest(url,archive,trash): Observable<NoteModel[]> {
  console.log('archive->'+archive,'trash->'+trash)
  return this.http.get<NoteModel[]>(environment.baseUrl+url+'?isArchive='+archive+'&isTrash='+trash,httpOptions);
}  

  public noteGetRequest(): any {

    console.log('local', localStorage.getItem('token'));

    const header = {
      headers: new HttpHeaders({
        'token': localStorage.getItem('token')
      })
    };
    return this.http.get(environment.baseUrl + 'note', header);
  }

  // public notePutRequest(url, data): any {

  //   const header = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json',
  //       'token': localStorage.getItem('token')
  //     }
  //     )
  //   };
  //   return this.http.put(environment.baseUrl + url, data, header);
  // }

  public notePutRequest(url, data): any {
    
    return this.http.put(environment.baseUrl + url, data, httpOptions);
  }

  public noteDeleteRequest(url, data): any {
    return this.http.delete(environment.baseUrl + url + data.id, httpOptions);
  }

  // Method for Auth guard
  public loggingIn() {
    return !!localStorage.getItem('token');
  }
// --------------------------------------------------------------------------------------//

// method to create label
public labelPostRequest(url,data): any {
  return this.http.post(environment.baseUrl + url, data,httpOptions);
 }

 // method to update label
 public labelPutRequest(url,data): any {
  return this.http.put(environment.baseUrl + url, data,httpOptions);
 }

 // method to get all label
 public getAllLabelRequest(url): Observable<Label[]> {
  // return this.http.post(environment.baseUrl + url, data,httpOptions);
  return this.http.get<Label[]>(environment.baseUrl+url,httpOptions);
 }

 // method to delete label
 public labelDeleteRequest(url): any {
  return this.http.delete(environment.baseUrl + url,httpOptions);
 }
}

