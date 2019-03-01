import { Component, OnInit, ɵConsole } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { NoteModel } from 'src/app/model/note.model';
import { NoteserviceService } from 'src/app/services/noteservice.service';
import { CardUpdateServiceService } from 'src/app/services/card-update-service.service';
// import { NoteComponent } from '../note/note.component';


@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.scss']
})
export class AddNoteComponent implements OnInit {

  colorCode: Array<Object> = [
    { name: 'white', colorCode: 'rgb(255, 255, 255)' },
    { name: 'lightGreen', colorCode: 'rgb(204, 255, 144)' },
    { name: 'purple', colorCode: 'rgb(215, 174, 251)' },
    { name: 'red', colorCode: 'rgb(242, 139, 130)' },
    { name: 'Teal', colorCode: 'rgb(167, 255, 235)' },
    { name: 'pink', colorCode: 'rgb(253, 207, 232)' },
    { name: 'orange', colorCode: 'rgb(251, 188, 4)' },
    { name: 'blue', colorCode: 'rgb(203, 240, 248)' },
    { name: 'brown', colorCode: 'rgb(230, 201, 168)' },
    { name: 'yellow', colorCode: 'rgb(255, 244, 117)' },
    { name: 'darkBlue', colorCode: 'rgb(174, 203, 250)' },
    { name: 'gray', colorCode: 'rgb(232, 234, 237)' }
  ];
  isOpen: boolean = false;
  menuOpen: boolean = false;
  pin: boolean = false;
  showTick: boolean = true;
  subMenuOpen: boolean = false;
  subMenu: boolean = false;
  open: boolean = false;

  showIcon: boolean = true;
  showBrush: boolean = true;
  noteBar: boolean = false;
  noteNewBar: boolean = false;
  color: string;
  note: NoteModel = new NoteModel();
  tempNote: NoteModel = new NoteModel();
  noteBarValue: NoteModel[];
  allNotes: NoteModel[];

  constructor(private router: Router, private notecrud: NoteserviceService, private snackBar: MatSnackBar,
      private cardUpdate: CardUpdateServiceService) {

  }

  ngOnInit() {


    this.notecrud.getAllNotes().subscribe(
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
  subMenuOpenFun() {
    this.subMenuOpen = true;
    this.showTick = false;
  }
  noteBarShow() {
    this.noteBar = !this.noteBar;
  }
  close(): void {
    // console.log(this.name,this.email,this.password,this.phoneNumber)

    this.isOpen = !this.isOpen;
    this.showIcon = false;

    console.log(this.note.title.length);
    if (this.note.title.length !== 0 || this.note.description.length !== 0) {
      this.note.color = this.color;
      this.note.pin = this.pin;
      this.noteBar = true;
      (this.notecrud.createNote(this.note)).subscribe(

        response => {
          if (response.statusCode === 166) {
            this.snackBar.open(response.statusMessage, '', {
              duration: 2000,
            });
          }
          this.cardUpdate.changemessage();
        },
        error => {
          console.log('Error', error);
        }

      );
      //  this.noteBarValue=this.note
      //   this.tempNote=this.note
      //   console.log('temp note ',this.tempNote)
      //   if(this.tempNote.title!=null)
      //   {
      //   this.noteNewBar=true;

      //   }

      this.note = new NoteModel();
      this.color = 'white';
      this.pin = false;
    }


  }
  archive(): void {
    console.log('archive function');

    this.isOpen = !this.isOpen;
    this.note.color = this.color;
    this.note.archive = true;
    this.notecrud.createNote(this.note).subscribe(
      data => {
        if (data.statusCode === 200) {
          if (this.allNotes.length === 0) {
            this.showIcon = true;
          }
          this.snackBar.open('Note Archive Successfully', '', {
            duration: 2000,
          });
        }
        this.cardUpdate.changemessage();
      },

      error => {

        console.log('Error', error);
      }

    );

    this.note = new NoteModel();
    this.note.color = 'white';
  }

  changeColor(color) {
    this.color = color;
  }

  changePin() {
    this.pin = !this.pin;
    console.log(this.pin);
  }

  addLabel() {
    this.subMenu = false;
    console.log(this.subMenu);

    this.subMenuOpen = true;
    console.log(this.subMenuOpen);

  }
  openMenu() {
    this.subMenuOpen = true;
    console.log(this.subMenuOpen);

  }
  menuSub() {
    this.open = true;
  }
}
