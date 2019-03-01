import { Injectable } from '@angular/core';
import { NoteModel } from '../model/note.model';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';





@Injectable({
  providedIn: 'root'
})
export class NoteserviceService {



  note: NoteModel = new NoteModel();
  constructor(private http: HttpClient) { }
  ngOnInit() {
    console.log('Note Service');


  }
  private userUrl = 'http://192.168.0.134:8080/user/';

  public createNote(note: NoteModel): any {
    console.log('local ', localStorage.getItem('token'));

    const httpOptions = {

      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': localStorage.getItem('token')
      }
      )
    };



    return this.http.post<NoteModel>(this.userUrl + 'note', note, httpOptions);

  }


  public getAllNotes(): Observable<NoteModel[]> | any {
    console.log('local ', localStorage.getItem('token'));
    const httpOptions2 = {
      headers: new HttpHeaders({
        'token': localStorage.getItem('token')

      })
    };


    return this.http.get<NoteModel[]>(this.userUrl + 'note', httpOptions2);

  }



  public archiveNote(note: NoteModel): any {
    const httpOptions = {

      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': localStorage.getItem('jwtToken')
      }
      )
    };
    console.log(this.userUrl + 'archiveNote');
    return this.http.post(this.userUrl + 'archiveNote', note, httpOptions);
  }



  public getArchiveNotes(): Observable<NoteModel[]> | any {
    console.log('local ', localStorage.getItem('jwtToken'));
    const httpOptions2 = {
      headers: new HttpHeaders({
        'token': localStorage.getItem('jwtToken')

      })
    };
    console.log(this.userUrl + 'getArchiveNote');

    console.log('header ', httpOptions2.headers.get('token'));
    console.log('get url', this.userUrl + 'getArchiveNote');

    return this.http.get<NoteModel[]>(this.userUrl + 'getArchiveNote', httpOptions2);
  }


  public deleteNote(note: NoteModel): any {
    const httpOptions = {

      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': localStorage.getItem('jwtToken')
      }
      )
    };

    return this.http.delete<NoteModel>(this.userUrl + 'note/' + note.id, httpOptions);
  }


  public updateNote(Note: NoteModel): any {
    const httpOptions = {

      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': localStorage.getItem('jwtToken')
      }
      )
    };

    return this.http.put<NoteModel>(this.userUrl + 'note', Note, httpOptions);
  }

  public updateArchiveNote(note: NoteModel): any {
    console.log('hihihi');

    const httpOptions = {

      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': localStorage.getItem('jwtToken')
      }
      )
    };
    console.log(this.userUrl + 'note/archive/' + note.id);

    return this.http.put<NoteModel>(this.userUrl + 'note/archive/' + note.id, null, httpOptions);

  }

  public updateTrashNote(note: NoteModel): any {
    const httpOptions = {

      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': localStorage.getItem('jwtToken')
      }
      )
    };
    return this.http.put<NoteModel>(this.userUrl + 'note/trash/' + note.id, null, httpOptions);

  }

  public updatePin(note: NoteModel): any {
    const httpOptions = {

      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': localStorage.getItem('jwtToken')
      }
      )
    };
    return this.http.put<NoteModel>(this.userUrl + 'note/pin/' + note.id, null, httpOptions);

  }


  public getTrashNotes(): Observable<NoteModel> | any {
    console.log('local ', localStorage.getItem('jwtToken'));
    const httpOptions2 = {
      headers: new HttpHeaders({
        'token': localStorage.getItem('jwtToken')

      })
    };
    console.log(this.userUrl + 'getTrashNote');

    console.log('header ', httpOptions2.headers.get('token'));
    console.log('get url', this.userUrl + 'getTrashNote');

    return this.http.get<NoteModel[]>(this.userUrl + 'getTrashNote', httpOptions2);
  }
}
