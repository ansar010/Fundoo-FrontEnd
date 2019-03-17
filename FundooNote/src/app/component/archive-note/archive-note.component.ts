import { Component, OnInit } from '@angular/core';
import { CardUpdateServiceService } from 'src/app/services/card-update-service.service';
import { NoteModel } from 'src/app/model/note.model';

@Component({
  selector: 'app-archive-note',
  templateUrl: './archive-note.component.html',
  styleUrls: ['./archive-note.component.scss']
})
export class ArchiveNoteComponent implements OnInit {

  private  allnotes:NoteModel[];
  
  constructor(private cardUpdate:CardUpdateServiceService) { 
    this.cardUpdate.changemessage('true','false');
  }

  ngOnInit() { 
    this.cardUpdate.currentNotes.subscribe(
      updatenotes=>
      this.allnotes=updatenotes 
      );
    }
  }
  // showIconAndLetter: boolean = true;
  // showArchiveNoteBar: boolean = true;
  // // noteBarValue : NoteModel[];
  // private allnotes: NoteModel[];



  // constructor(private cardUpdate: CardUpdateServiceService) { }

  // ngOnInit() {



  //   this.cardUpdate.currentNotes.subscribe(udnotes =>
  //     this.allnotes = udnotes);
  // }

