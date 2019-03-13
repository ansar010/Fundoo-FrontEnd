import { Component, OnInit, ViewChild } from '@angular/core';
import { NoteModel } from 'src/app/model/note.model';
import { HttpserviceService } from 'src/app/services/httpservice.service';
import { MatSnackBar } from '@angular/material';
import { NoteComponent } from '../note/note.component';
import { ChildActivationEnd } from '@angular/router';


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

  private isOpen: boolean;
  private isPin: boolean = false;
  private note: NoteModel = new NoteModel();
  color: string;
  allNotes: NoteModel[];
  showIcon: boolean = true;

  constructor(private httpService: HttpserviceService, private snackBar: MatSnackBar) { }

  // to load notes automatically
  @ViewChild(NoteComponent) Child;

  ngOnInit() {
    this.isPin = false;
  }

  close() {
    console.log(this.note.title.length);
    this.isOpen = true;
    if (this.note.title.length !== 0 && this.note.description.length !== 0) {
      this.note.color = this.color;

      this.httpService.notePostRequest('note', this.note).subscribe(
        response => {
          if (response.statusCode === 100) {
            this.snackBar.open(response.statusMessage, '',
              {
                duration: 2000
              });
              this.Child.getNote();
          } else {
            this.snackBar.open(response.statusMessage, '', { duration: 2000 });
          }

        },

        error => {
          this.snackBar.open('Network Problem', 'fail', {
            duration: 2000,
          });
        }

      );

      this.note = new NoteModel();
      this.note.color = 'white';
    }
  }

  changeColor(color) {
    this.color = color;
  }

  changePin() {
    // this.isPin = !this.isPin;
    // if (this.isPin === true) {
    //   this.isOpen = false;
    // }
    this.isPin = true;

  }
}


