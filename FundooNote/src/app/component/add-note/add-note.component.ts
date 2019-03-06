import { Component, OnInit } from '@angular/core';
import { NoteModel } from 'src/app/model/note.model';
import { HttpNoteServiceService } from 'src/app/services/http-note-service.service';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.scss']
})
export class AddNoteComponent implements OnInit {

  private isOpen: boolean = false;
  private isPin: boolean = false;
  private note: NoteModel = new NoteModel();
  allNotes: NoteModel[];
  showIcon: boolean = true;

  constructor(private httpService: HttpNoteServiceService) { }

  ngOnInit() {
    this.httpService.getAllNotes().subscribe(
      response => {

        this.allNotes = response;
        if (this.allNotes.length !== 0) {
          this.showIcon = false;
        }
      },
      error => {
        console.log(error);
      }
    );

  }


  changePin() {
    // this.isPin = !this.isPin;
    this.isPin = true;
    console.log(this.isPin);
  }
}


