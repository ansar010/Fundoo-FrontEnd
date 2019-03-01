import { Component, OnInit } from '@angular/core';
import { NoteModel } from 'src/app/model/note.model';
import { NoteserviceService } from 'src/app/services/noteservice.service';
import { CardUpdateServiceService } from 'src/app/services/card-update-service.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {

  private allnotes: NoteModel[];
  constructor(private cardupdate: CardUpdateServiceService, private notecrudservice: NoteserviceService) { }
  showIcon: boolean = false;

  ngOnInit() {

    this.cardupdate.currentnotes.subscribe(udnotes =>
      this.allnotes = udnotes);
    console.log('new note');
    console.log('length ', this.allnotes.length);


  }
}
