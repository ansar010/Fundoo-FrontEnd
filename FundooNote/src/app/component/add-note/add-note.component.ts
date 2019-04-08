import { Component, OnInit, ViewChild } from '@angular/core';
import { NoteModel } from 'src/app/model/note.model';
import { HttpserviceService } from 'src/app/services/httpservice.service';
import { MatSnackBar } from '@angular/material';
import { NoteComponent } from '../note/note.component';
import { ChildActivationEnd } from '@angular/router';
import { NoteDto } from 'src/app/model/noteDTO.model';
import { CardUpdateServiceService } from 'src/app/services/card-update-service.service';


@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.scss']
})
export class AddNoteComponent implements OnInit {

  noteDto: NoteDto = new NoteDto();

  private showAddNote: boolean;
  private isPinned: boolean = false;

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
  color: string;

  constructor(private httpService: HttpserviceService,
    private snackBar: MatSnackBar, private currentNotes: CardUpdateServiceService) { }

  ngOnInit() {
    
  }

  // method to expand note bar
  changeBar() {
    this.showAddNote = true;
  }

  // Method to change pin
  changePin() {

    this.isPinned = !this.isPinned;
  }

  // Method to change color
  changeColor(color) {
    this.color = color;
  }


  // Method to create note
  close() {

    this.noteDto.color = this.color;
    this.noteDto.isPin = this.isPinned;
    console.log('Add pin ' + this.noteDto.isPin);
    this.httpService.notePostRequest('note', this.noteDto).subscribe(
      response => {
        if (response.statusCode === 100) {
          this.snackBar.open(response.statusMessage, '',
            {
              duration: 2000
            });
          // this.Child.getNote();
          this.currentNotes.updateMessage();
        } else {
          this.snackBar.open(response.statusMessage, 'Fail', { duration: 3000 });
        }

      },

      error => {
        this.snackBar.open('Network Problem', 'fail', {
          duration: 2000,
        });
      }
    );
    this.showAddNote = false;
    this.isPinned = false;
    this.noteDto = new NoteDto();
    this.color = '';
  }
}
