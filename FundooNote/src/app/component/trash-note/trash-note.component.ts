import { Component, OnInit, Input } from '@angular/core';
import { NoteModel } from 'src/app/model/note.model';
import { CardUpdateServiceService } from 'src/app/services/card-update-service.service';
import { CurrentViewService } from 'src/app/services/current-view.service';

@Component({
  selector: 'app-trash-note',
  templateUrl: './trash-note.component.html',
  styleUrls: ['./trash-note.component.scss']
})
export class TrashNoteComponent implements OnInit {

  showIconAndLetter: boolean = true;
  private allnotes: NoteModel[];
  private showIcon: boolean = true;
  private gridView: boolean;
  // @Input() noteDetail: NoteModel[];

  constructor(private cardUpdate: CardUpdateServiceService, private view:CurrentViewService) {
    this.cardUpdate.changemessage('false', 'true');
  }

  ngOnInit() {
    this.cardUpdate.currentNotes.subscribe(
      updatenotes =>
        this.allnotes = updatenotes);

        this.view.currentView.subscribe(
          response => {
            this.gridView = response;
          }
        );
        // this.cardUpdate.changemessage('false', 'true');
        if (this.allnotes.length > 0) {
          this.showIcon = this.showIcon;
        }
  }

  // restoreNote() : void{
  //   this.noteCrud.updateTrashNote(this.noteDetail).subscribe(
  //     data=> {
  //       if(data.statusCode==166)
  //       {

  //         this.snackBar.open('Note Archive Successfully', '', {
  //           duration: 2000,});
  //       }

  //       this.cardUpdate.changemessage();

  //     },

  //       error => {

  //           console.log("Error", error);
  //       }

  //      );
  // }

}
