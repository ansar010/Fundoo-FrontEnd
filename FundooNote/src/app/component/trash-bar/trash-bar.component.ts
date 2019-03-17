import { Component, OnInit, Input } from '@angular/core';
import { NoteModel } from 'src/app/model/note.model';
import { HttpserviceService } from 'src/app/services/httpservice.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { DeleteCardComponent } from '../delete-card/delete-card.component';
import { CardUpdateServiceService } from 'src/app/services/card-update-service.service';

@Component({
  selector: 'app-trash-bar',
  templateUrl: './trash-bar.component.html',
  styleUrls: ['./trash-bar.component.scss']
})
export class TrashBarComponent implements OnInit {

  @Input() noteDetail : NoteModel;

  constructor(private httpService : HttpserviceService, private snackBar : MatSnackBar, private cardUpdate : CardUpdateServiceService) { }

  //   @Input() noteDetail: NoteModel;

  //   constructor(private httpService: HttpserviceService, private snackBar: MatSnackBar) { }

  //   ngOnInit() {
  //   }

  //   deleteForever()
  //   {
  //     this.httpService.noteDeleteRequest('note/', this.noteDetail);
  //   }
  // }
  // @Input() noteDetail: NoteModel;

  // constructor(private httpService: HttpserviceService, private snackBar: MatSnackBar,
  //   private dialog: MatDialog) { }

  ngOnInit() {
    console.log(this.noteDetail)
  }

  // restore() {
  //   this.noteDetail.isTrash = false;
  //   this.httpService.noteIDPutRequest(,this.notedetails.note).subscribe(
  //     response => {
  //       if (response.statusCode == 166) {
  //         this.snackBar.open(response.statusMessage, "", {
  //           duration: 2000,

  //         })
  //         this.cardupdate.changemessage2();
  //       }
  //     },
  //     error => {
  //       console.log("Error", error);
  //     }
  //   );
  // }

  restoreNote(): void {
    this.noteDetail.isTrash = false;
    this.httpService.noteIDPutRequest('note/trash/', this.noteDetail).subscribe
      (
        response => {
          if (response.statusCode === 100) {
            this.snackBar.open(response.statusMessage, '', { duration: 2000 });
            this.cardUpdate.updateMessage();
          } else {
            this.snackBar.open(response.statusMessage, '', { duration: 3000 });

          }
        }
      );
  }

  deleteNote(): void {
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
        this.cardUpdate.updateMessage();
      },

      error => {

        this.snackBar.open('Network Problem', 'Fail', { duration: 3000 });
        console.log('Error', error);
      }
    );
  }
}
