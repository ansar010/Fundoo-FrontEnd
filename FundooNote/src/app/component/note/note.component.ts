import { Component, OnInit } from '@angular/core';
import { HttpserviceService } from 'src/app/services/httpservice.service';
import { NoteModel } from 'src/app/model/note.model';
import { CardUpdateServiceService } from 'src/app/services/card-update-service.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {
  private allnotes: NoteModel[];

  private showPinned: boolean = false;
  private showUnpinned: boolean = false;

  // private
  // constructor(private cardupdate: CardUpdateServiceService, private httpNoteService: HttpNoteServiceService) { }
  constructor(private cardupdate: CardUpdateServiceService) {
    this.cardupdate.changemessage('false', 'false');
    this.cardupdate.currentNotes.subscribe(updatenotes => {
      console.log(updatenotes);
      this.allnotes = updatenotes;
      this.showPinned = false;
      this.showUnpinned = false;
      this.pinFilter();
    });
  }
  ngOnInit() {
    this.cardupdate.currentNotes.subscribe(updateNotes =>
      this.allnotes = updateNotes);
    this.showPinned = false;
    this.showUnpinned = false;
    this.pinFilter();
    console.log('new note');
    console.log('length ', this.allnotes.length);

  }

  private pinFilter() {
    console.log('Pin filte called');
    this.allnotes.forEach(element => {
      console.log('Pin status ' + element.isPin);

      if (element.isPin === true) {
        this.showPinned = true;
      } else {
        this.showUnpinned = true;
      }
    });
  }









  // private content_filter() {
  //   this.allnotes.forEach(x => {
  //     if (x.note.pinned == true) {
  //       this.showPinned = true;
  //     }

  //     if (x.note.pinned == false) {
  //       this.showUnpinned = true;
  //     }
  //   })
  // }

}

  // private allnotes: NoteModel[];

  // constructor(private cardupdate: CardUpdateServiceService, private httpNoteService: HttpNoteServiceService) { }

  // ngOnInit() {

  //   this.cardupdate.currentnotes.subscribe(udnotes =>
  //     this.allnotes = udnotes);
  //   console.log('new note');
  //   console.log('length ', this.allnotes.length);
  //   this.getNote();

  // }

  // getNote() {
  //   this.cardupdate.currentnotes.subscribe(udnotes =>
  //     this.allnotes = udnotes);
  //   console.log('new note');
  //   console.log('length ', this.allnotes.length);

  // }
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

// }
