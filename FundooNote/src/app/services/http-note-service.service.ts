import { Injectable } from '@angular/core';
import { NoteComponent } from '../component/note/note.component';
import { NoteModel } from '../model/note.model';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpNoteServiceService {

  private userUrl = 'http://192.168.0.56:8080/user/note';

  note: NoteModel = new NoteModel();

  constructor(private http: HttpClient) { }

  ngOnInit() {
    console.log('Note Service');


  }

  public createNote(note: NoteModel): any {
    console.log('local ', localStorage.getItem('jwtToken'));

    const httpOptions = {

      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': localStorage.getItem('jwtToken')
      }
      )
    };

    return this.http.post<NoteModel>(this.userUrl + 'note', note, httpOptions);

  }

  public getAllNotes(): Observable<NoteModel[]> | any {
    console.log('local ', localStorage.getItem('jwtToken'));
    const httpOptions2 = {
      headers: new HttpHeaders({
        'token': localStorage.getItem('jwtToken')
      })
    };
    return this.http.get<NoteModel[]>(this.userUrl , httpOptions2);

  }
  // public createNote(note: NoteModel): any {
  //   console.log('local ', localStorage.getItem('jwtToken'))

  //   var httpOptions = {

  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json',
  //       'token': localStorage.getItem('jwtToken')
  //     }
  //     )
  //   };



  //   return this.http.post<NoteModel>(this.userUrl + 'note', note, httpOptions);

  // }


}
