import { Component, OnInit, Input } from '@angular/core';
import { MatSnackBar, MatDialog } from '@angular/material';
import { CardUpdateServiceService } from 'src/app/services/card-update-service.service';
import { NoteserviceService } from 'src/app/services/noteservice.service';
import { NoteModel } from 'src/app/model/note.model';
// import { EditCardComponent } from '../edit-card/edit-card.component';


@Component({
  selector: 'app-note-bar',
  templateUrl: './note-bar.component.html',
  styleUrls: ['./note-bar.component.scss']
})
export class NoteBarComponent implements OnInit {

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

  isOpenNote: boolean = false;
  archiveShow: boolean = false;
  unarchiveShow: boolean = false;
  noteBarValue: NoteModel = new NoteModel();
  noteBar: boolean = false;
  color: string;


  @Input() noteDetail: NoteModel;
  constructor(private cardUpdate: CardUpdateServiceService,
     private snackBar: MatSnackBar, private noteService: NoteserviceService, private dialog: MatDialog) {

  }


  ngOnInit() {

    console.log(this.noteBarValue);
    console.log(this.noteBarValue.archive);
    // console.log('hello ',this.noteDetail)
    //  console.log(this.noteDetail.archive)
    console.log('hellllllooooo');
    if (this.noteDetail.archive === false) {
      this.archiveShow = true;
    }
    if (this.noteDetail.archive === true) {
      this.unarchiveShow = true;
    }
    // this.cardUpdate.changemessage();
  }

  archive(): void {
    console.log('archive function');
    console.log(this.noteDetail);

    this.noteService.updateArchiveNote(this.noteDetail).subscribe(
      data => {
        if (data.statusCode === 166) {

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
  }

  deleteNote(): void {
    console.log('deleteddd');

    console.log(this.noteDetail);
    this.noteService.updateTrashNote(this.noteDetail).subscribe(
      data => {
        if (data.statusCode === 166) {

          this.snackBar.open('Note deleted Successfully', '', {
            duration: 2000,
          });
        }
        this.cardUpdate.changemessage();
      },

      error => {

        console.log('Error', error);
      }

    );
  }

  changeColor(color) {
    this.noteDetail.color = color;
    this.noteService.updateNote(this.noteDetail).subscribe(
      data => {
        if (data.statusCode === 166) {

          this.snackBar.open('color updated Successfully', '', {
            duration: 2000,
          });
        }
        this.cardUpdate.changemessage();
      },

      error => {

        console.log('Error', error);
      }

    );

  }

  changePin() {
    this.noteService.updatePin(this.noteDetail).subscribe(
      data => {
        if (data.statusCode === 166) {

          this.snackBar.open('pin updated Successfully', '', {
            duration: 2000,
          });
        }
        this.cardUpdate.changemessage();

      },
      error => {
        console.log('Error', error);
      }

    );
  }

  // openEditDialog(item) {
  //   console.log('note ', item);

  //   const dialogRef = this.dialog.open(EditCardComponent, {
  //     width: '550px',

  //     data: item
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');
  //     console.log('after dialog ', item);
  //     this.noteService.updateNote(item).subscribe(
  //       data => {
  //         if (data.statusCode === 166) {

  //           this.snackBar.open('note updated Successfully', '', {
  //             duration: 2000,
  //           });
  //         }
  //         this.cardUpdate.changemessage();
  //       }
  //     );


  //   });

  // }
}
