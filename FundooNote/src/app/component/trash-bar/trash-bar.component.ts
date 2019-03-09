import { Component, OnInit, Input } from '@angular/core';
import { NoteModel } from 'src/app/model/note.model';
import { HttpserviceService } from 'src/app/services/httpservice.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { DeleteCardComponent } from '../delete-card/delete-card.component';

@Component({
  selector: 'app-trash-bar',
  templateUrl: './trash-bar.component.html',
  styleUrls: ['./trash-bar.component.scss']
})
export class TrashBarComponent implements OnInit {

  //   @Input() noteDetail: NoteModel;

  //   constructor(private httpService: HttpserviceService, private snackBar: MatSnackBar) { }

  //   ngOnInit() {
  //   }

  //   deleteForever()
  //   {
  //     this.httpService.noteDeleteRequest('note/', this.noteDetail);
  //   }
  // }
  @Input() noteDetail: NoteModel;

  constructor(private httpService: HttpserviceService, private snackBar: MatSnackBar,
    private dialog: MatDialog) { }

  ngOnInit() {
  }
  // restoreNote(): void {
  //   this.noteCrud.updateTrashNote(this.noteDetail).subscribe(
  //     data => {
  //       if (data.statusCode == 166) {

  //         this.snackBar.open('Note Restore Successfully', '', {
  //           duration: 2000,
  //         });
  //       }
  //       this.cardUpdate.changemessage();
  //     },

  //     error => {

  //       console.log("Error", error);
  //     }

  //   )
  // }

  // openEditDialog(item) {
  //   console.log('note ', item);

  //   const dialogRef = this.dialog.open(DeleteCardComponent, {
  //     width: '550px',

  //     data: item
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');
  //     console.log('after dialog ', item);
  //     this.httpService.noteDeleteRequest('note/', this.noteDetail).subscribe(
  //       data => {
  //         if (data.statusCode === 100) {

  //           this.snackBar.open(data.statusMessage, '', {
  //             duration: 2000,
  //           });
  //         } else {
  //           this.snackBar.open(data.statusMessage, '', {
  //             duration: 3000,
  //           });
  //         }
  //       },

  //       error => {

  //         this.snackBar.open('Network Problem', 'Fail', { duration: 3000 });
  //         console.log('Error', error);
  //       }
  //     );
  //   });

  // }
  restoreNote(): void {
    this.httpService.noteIDPutRequest('note/trash/', this.noteDetail).subscribe
      (
        response => {
          if (response.statusCode === 100) {
            this.snackBar.open(response.statusMessage, '', { duration: 2000 });
          } else {
            this.snackBar.open(response.statusMessage, '', { duration: 3000 });

          }
        }
      );
  }

  deleteForever(): void {
    this.httpService.noteDeleteRequest('note/', this.noteDetail).subscribe(
      data => {
        if (data.statusCode === 100) {

          this.snackBar.open(data.statusMessage, '', {
            duration: 2000,
          });
        } else {
          this.snackBar.open(data.statusMessage, '', {
            duration: 3000,
          });
        }
        // this.cardUpdate.changemessage();
      },

      error => {

        this.snackBar.open('Network Problem', 'Fail', { duration: 3000 });
        console.log('Error', error);
      }
    );
  }
}
