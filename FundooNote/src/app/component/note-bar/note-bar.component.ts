import { Component, OnInit, Input } from '@angular/core';
import { NoteModel } from 'src/app/model/note.model';
import { MatDialog, MatSnackBar } from '@angular/material';
import { HttpserviceService } from 'src/app/services/httpservice.service';
import { EditCardComponent } from '../edit-card/edit-card.component';
import { CardUpdateServiceService } from 'src/app/services/card-update-service.service';
import { Label } from 'src/app/model/label.model';

@Component({
  selector: 'app-note-bar',
  templateUrl: './note-bar.component.html',
  styleUrls: ['./note-bar.component.scss']
})
export class NoteBarComponent implements OnInit {

  private pinIcon: boolean;

  allLabels: Label[];
// -------
private show: boolean = false;

private searchLabelValue: string;
// -------
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

  @Input() noteDetail: NoteModel;
  constructor(private cardUpdate: CardUpdateServiceService, private httpService: HttpserviceService,
    private snackBar: MatSnackBar, private dialog: MatDialog) { }
  // private pinIcon: boolean=this.noteDetail.isPin;


  ngOnInit() {
    console.log('noteDetail->' + this.noteDetail.isArchive);
    console.log('Pin check-> ' + this.noteDetail.isPin);
    console.log('noteDetail label->' + this.noteDetail.labels);

    this.pinIcon = this.noteDetail.isPin;

    // this.httpService.getAllLabelRequest('label/').subscribe(
    //   labels => {
    //     this.allLabels = labels;
    //   }
    // );
    this.getLabels();
  }

  getLabels() {
    this.httpService.getAllLabelRequest('label/').subscribe(
      labels => {
        this.allLabels = labels;
      }
    );
  }

  changePin() {
    console.log('change pin status ' + this.noteDetail.isPin);
    this.pinIcon = !this.pinIcon;
    this.httpService.noteIDPutRequest('note/pin/', this.noteDetail).subscribe(
      data => {
        if (data.statusCode === 100) {

          this.snackBar.open(data.statusMessage, 'success', {
            duration: 2000,
          });
        }
        this.cardUpdate.updateMessage();
      },
      error => {

        console.log('Error', error);
      }

    );
    // this.pinIcon=this.noteDetail.isPin;

    if (this.noteDetail.isPin) {
      this.noteDetail.isArchive = false;
      // this.pinIcon=this.noteDetail.isPin;
    }
  }

  openEditDialog(item) {
    console.log('note', item);
    const dialogRef = this.dialog.open(EditCardComponent, {
      width: '400px',
      data: item
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log('after dialog ', item);
      this.httpService.notePutRequest('note', this.noteDetail).subscribe(
        response => {
          if (response.statusCode === 100) {
            this.snackBar.open(response.statusMessage, 'success', {
              duration: 2000,
            });
          }
          this.cardUpdate.updateMessage();
        },
        error => {
          console.log('Error', error);
        }
      );
    });
  }


  changeColor(color) {
    this.noteDetail.color = color;
    this.httpService.notePutRequest('note', this.noteDetail).subscribe(
      data => {
        if (data.statusCode === 100) {

          this.snackBar.open(data.statusMessage, 'success', {
            duration: 2000,
          });
        }
        this.cardUpdate.updateMessage();
      },
      error => {

        console.log('Error', error);
      }

    );
  }


  trashNote() {
    this.noteDetail.isTrash = true;
    this.noteDetail.isArchive = false;
    this.noteDetail.isPin = false;
    this.httpService.noteIDPutRequest('note/trash/', this.noteDetail).subscribe(
      response => {
        if (response.statusCode === 100) {
          this.snackBar.open(response.statusMessage, 'Success', {
            duration: 2000,

          });
        }
        this.cardUpdate.updateMessage();
      },
      error => {
        console.log('Error', error);
      }
    );

  }

  archiveNote() {
    this.noteDetail.isArchive = !this.noteDetail.isArchive;
    this.noteDetail.isTrash = false;
    this.httpService.noteIDPutRequest('note/archive/', this.noteDetail).subscribe(
      response => {
        if (response.statusCode === 100) {
          this.snackBar.open(response.statusMessage, 'Success', {
            duration: 2000,

          });
        }
        this.cardUpdate.updateMessage();
      },
      error => {
        console.log('Error', error);
      }
    );
  }

  // --------
  stopPropagation(event) {
    console.log('propogation' + event);
    event.stopPropagation();
  }

  onSearchChange(searchValue: string) {
    if (!searchValue) {
    //   this.show = false;
      this.getLabels();
    } else {
      // this.show = true;
      this.allLabels = this.allLabels.filter(label => label.labelName.toLowerCase().indexOf(searchValue.toLowerCase()) > -1);
      this.searchLabelValue = searchValue;
    }
  }

  addLabelToNote(event, labelId: LongRange, noteId: LongRange) {
    console.log('event data');
    console.log(event);
    this.httpService.lableNotePostRequest('label/addLabeltonote?labelId=' + labelId + '&noteId=' + noteId)
      .subscribe(
        (response: any) => {
          // this.getLabels();
          this.cardUpdate.updateMessage();
          this.snackBar.open(response.statusMessage, '', { duration: 2000 });

        }
      );
  }

  // addLabelToNote(event, labelId: LongRange, noteId: LongRange) {
  //   console.log("event data")
  //   console.log(event)
  //   this.noteService.addLabelToNote(labelId, noteId)
  //     .subscribe(
  //       (response: any) => {
  //         this.getLabels();
  //         this.updateService.changeUpdate(false, false);
  //         this.snackBar.open(response.statusMessage, "", { duration: 5000, verticalPosition: "top" });

  //       }
  //     );
  // }

  // --------

  // haveThisLabel(label: Label, note: NoteModel) {
  //   console.log(label.labelName + ' ' + note.id);
  //   this.httpService.addLabelToNote(label.id, note.id).subscribe(
  //     // this.httpService.addLabelToNote('label/addLabeltonote?labelId=' + label.id + '&noteId='+note.id).subscribe(
  //   response => {

  //       console.log(response);
  //       // this.cardupdate.changemessage2();
  //     }
  //   );
  // }



  // removeThisLabel(label: Label, note: CreateNoteModel) {

  //   this.notecrudservice.deletenotetolabel(label.id, note.id).subscribe(
  //     response => {
  //       this.cardupdate.changemessage2();
  //     })
  // }
}
    // archive() {
    //     this.httpService.noteIDPutRequest('note/archive/', this.noteDetail).subscribe
    //     (
    //         response => {
    //             if (response.statusCode === 100) {
    //                 this.snackBar.open(response.statusMessage, '', { duration: 2000 });
    //             } else {
    //                 this.snackBar.open(response.statusMessage, '', { duration: 3000 });
    //             }
    //         },
    //         error => {
    //             this.snackBar.open('Network Problem', '', { duration: 2000 });

    //         }


    //     );
    // }

    // changeColor(color) {
    //     this.noteDetail.color = color;
    //     this.httpService.notePutRequest('note', this.noteDetail).subscribe(
    //         data => {
    //             if (data.statusCode === 100) {
    //                 this.snackBar.open('color updated Successfully', '', {
    //                     duration: 2000,
    //                 });
    //             }
    //             //  this.cardUpdate.changemessage();
    //         },
    //         error => {

    //             console.log('Error', error);
    //         }

    //     );
    // }
    // changePin() {
    //     this.httpService.noteIDPutRequest('note/pin/', this.noteDetail).subscribe
    //     ( response => {
    //         if (response.statusCode === 100) {
    //             this.snackBar.open(response.statusMessage, '', { duration: 2000 });
    //         } else {
    //             this.snackBar.open(response.statusMessage, '', { duration: 3000 });
    //         }
    //     },
    //     error => {
    //         this.snackBar.open('Network Problem', '', { duration: 2000 });

    //     }


    // );
    // }

    // deleteNote(): void {
    //     console.log('Note Deleted');
    //     console.log(this.noteDetail);
    //     this.httpService.noteIDPutRequest('note/trash/' , this.noteDetail).subscribe
    //         (
    //             response => {
    //                 if (response.statusCode === 100) {
    //                     this.snackBar.open(response.statusMessage, '', { duration: 2000 });
    //                 } else {
    //                     this.snackBar.open(response.statusMessage, '', { duration: 3000 });
    //                 }
    //             },
    //             error => {
    //                 this.snackBar.open('Network Problem', '', { duration: 2000 });

    //             }


    //         );
    // }
    // openEditDialog(item) {
    //     console.log('note ', item);

    //     const dialogRef = this.dialog.open(EditCardComponent, {
    //         width: '550px',

    //         data: item
    //     });

    //     dialogRef.afterClosed().subscribe(result => {
    //         console.log('The dialog was closed');
    //         console.log('after dialog ', item);
    //         this.httpService.notePutRequest('note', item).subscribe(
    //             data => {
    //                 if (data.statusCode === 100) {

    //                     this.snackBar.open('note updated Successfully', '', {
    //                         duration: 2000,
    //                     });
    //                 }
    //             }
    //         );
    //     });

    // }



