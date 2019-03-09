import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { NoteModel } from '../model/note.model';
import { notEqual } from 'assert';

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

  public noteIDPutRequest(url, note: NoteModel): any {
   console.log(note.noteId);
    const header = {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        'token': localStorage.getItem('token')
      })
    };
    return this.http.put(environment.baseUrl + url + note.noteId, '', header);
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
    const header = {

      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': localStorage.getItem('token')
      }
      )
    };
    return this.http.post(environment.baseUrl + url, data, header);
  }

  // public getAllNotes() : Observable<NoteModel[]> | any
  // {
  public noteGetRequest(): any {

    console.log('local', localStorage.getItem('token'));

    const header = {
      headers: new HttpHeaders({
        'token': localStorage.getItem('token')
      })
    };

    // return this.http.get<NoteModel[]>(this.userUrl+"note",httpOptions2);
    return this.http.get(environment.baseUrl + 'note', header);
  }

  public notePutRequest(url, data): any {

    const header = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': localStorage.getItem('token')
      }
      )
    };
    return this.http.put(environment.baseUrl + url, data, header);
  }

  public noteDeleteRequest(url, data): any {
    const header = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': localStorage.getItem('token')
      }
      )
    };
    return this.http.delete(environment.baseUrl + url + data.noteId, header);
  }
}
