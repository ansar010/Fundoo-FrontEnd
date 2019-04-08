import { Component, OnInit } from '@angular/core';
import { CardUpdateServiceService } from 'src/app/services/card-update-service.service';
import { NoteModel } from 'src/app/model/note.model';
import { CurrentViewService } from 'src/app/services/current-view.service';

@Component({
  selector: 'app-archive-note',
  templateUrl: './archive-note.component.html',
  styleUrls: ['./archive-note.component.scss']
})
export class ArchiveNoteComponent implements OnInit {
  private gridView: boolean;
  private allnotes: NoteModel[];
  private showIcon: boolean = true;
  constructor(private cardUpdate: CardUpdateServiceService, private view: CurrentViewService) {
    this.cardUpdate.changemessage('true', 'false');
  }

  ngOnInit() {
    this.cardUpdate.currentNotes.subscribe(
      updatenotes =>
        this.allnotes = updatenotes
    );

    this.view.currentView.subscribe(
      response => {
        this.gridView = response;
      }
    );
    console.log('All notes ' + this.allnotes.length);

    if (this.allnotes.length > 0) {
      this.showIcon = false;
    }
  }
}

