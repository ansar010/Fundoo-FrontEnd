import { Component, OnInit } from '@angular/core';
import { HttpserviceService } from 'src/app/services/httpservice.service';
import { NoteModel } from 'src/app/model/note.model';
import { CardUpdateServiceService } from 'src/app/services/card-update-service.service';
import { CurrentViewService } from 'src/app/services/current-view.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {
  private allnotes: NoteModel[];

  private showPinned: boolean = false;
  private showUnpinned: boolean = false;
  private gridView: boolean;

  // searchedText: string;

  constructor(private cardupdate: CardUpdateServiceService, private view: CurrentViewService) {
    // setTimeout(() => this.cardupdate.changemessage('false', 'false'), 3000);


  }

  ngOnInit() {
    this.cardupdate.changemessage('false', 'false');

    // this.cardupdate.current_search.subscribe(response => {
    //   console.log('note component ' + response);
    //   this.searchedText = response; });

      this.cardupdate.currentNotes.subscribe(updatenotes => {
      console.log(updatenotes);
      this.allnotes = updatenotes;
      this.showPinned = false;
      this.showUnpinned = false;
      this.pinFilter();
    });

    this.cardupdate.currentNotes.subscribe(updateNotes =>
      this.allnotes = updateNotes);

    this.view.currentView.subscribe(
      response => {
        this.gridView = response;
        console.log('GridView:' + this.gridView);

      }
    );

    console.log('GridView:' + this.gridView);

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
