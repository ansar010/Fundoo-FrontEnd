import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { NoteModel } from 'src/app/model/note.model';
import { HttpserviceService } from 'src/app/services/httpservice.service';

@Component({
  selector: 'app-edit-card',
  templateUrl: './edit-card.component.html',
  styleUrls: ['./edit-card.component.scss']
})
export class EditCardComponent implements OnInit {

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

  isOpen: boolean = false;
  private pinIcon: boolean;

  // mat dialog ref keep the track of open dialog
  constructor(
    public dialogRef: MatDialogRef<EditCardComponent>,
    @Inject(MAT_DIALOG_DATA) public noteDetail: NoteModel, private httpService: HttpserviceService,
    private snackBar: MatSnackBar) {

  }


  ngOnInit() {
    console.log('data->' + this.noteDetail.title);
    console.log('pin data ->' + this.noteDetail.isPin);

    this.pinIcon = this.noteDetail.isPin;
    console.log('pinIcon data ->' + !(this.pinIcon));

  }

  // method to change pin
  changePin() {
    // this.pinIcon=!this.pinIcon;
    // this.noteDetail.isPin=this.pinIcon;
    this.snackBar.open('can not change pin status here!!', 'Error', { duration: 3000 });
  }
  // method to change the color
  changeColor(color) {
    this.noteDetail.color = color;
  }
}
