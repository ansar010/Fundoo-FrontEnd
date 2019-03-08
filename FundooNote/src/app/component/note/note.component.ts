import { Component, OnInit } from '@angular/core';
import { HttpserviceService } from 'src/app/services/httpservice.service';
import { NoteModel } from 'src/app/model/note.model';
import { CardUpdateServiceService } from 'src/app/services/card-update-service.service';
import { HttpNoteServiceService } from 'src/app/services/http-note-service.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {

  private allnotes: NoteModel[];

  constructor(private cardupdate: CardUpdateServiceService, private httpNoteService: HttpNoteServiceService) { }
  showIcon: boolean = false;

  ngOnInit() {

    this.cardupdate.currentnotes.subscribe(udnotes =>
      this.allnotes = udnotes);
    console.log('new note');
    console.log('length ', this.allnotes.length);
  }






  // getNote() {
  //   this.httpService.getRequest1('/user/note/list')
  //     .subscribe(

  //       (response) => {
  //         console.log('success get notes', response);
  //         this.data = response['body'];
  //         console.log('in response', this.data);
  //       },
  //       (error) => {
  //         console.log('error', error);
  //       }
  //     );
  // }

}
