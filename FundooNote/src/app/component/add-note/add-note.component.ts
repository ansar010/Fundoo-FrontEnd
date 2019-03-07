import { Component, OnInit } from '@angular/core';
import { NoteModel } from 'src/app/model/note.model';
import { HttpNoteServiceService } from 'src/app/services/http-note-service.service';
import { HttpserviceService } from 'src/app/services/httpservice.service';
import { MatSnackBar } from '@angular/material';
import { error } from 'util';
import { notEqual } from 'assert';

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

  private isOpen: boolean = false;
  private isPin: boolean = false;
  private note: NoteModel = new NoteModel();
  color: string;

  allNotes: NoteModel[];
  showIcon: boolean = true;

  constructor(private httpService: HttpserviceService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    // this.httpService.getAllNotes().subscribe(
    //   response => {

    //     this.allNotes = response;
    //     if (this.allNotes.length !== 0) {
    //       this.showIcon = false;
    //     }
    //   },
    //   error => {
    //     console.log(error);
    //   }
    // );

  }
  //   close() : void {
  //     // console.log(this.name,this.email,this.password,this.phoneNumber)

  //     this.isOpen=!this.isOpen;
  //     this.showIcon=false;

  //     console.log(this.note.title.length);
  //     if(this.note.title.length!=0 || this.note.description.length!=0)
  //        {
  //         this.note.color=this.color;
  //         this.note.pin=this.pin;
  //         this.noteBar=true;
  //   (this.notecrud.createNote(this.note)).subscribe(

  //     response =>{
  //       if(response.statusCode==166)
  //       {
  //         this.snackBar.open(response.statusMessage,"",{
  //           duration:2000,
  //         })
  //       }
  //       this.cardUpdate.changemessage();
  //     },
  //     error =>{
  //       console.log("Error",error);
  //     }

  //     );


  //  this.note=new NoteModel();
  //  this.color="white"
  //  this.pin=false;
  // }


  // }
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

  // changePin() {
  //   // this.isPin = !this.isPin;
  //   this.isPin = true;
  //   console.log(this.isPin);
  // }
}


