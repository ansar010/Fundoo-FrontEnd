import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { NoteModel } from 'src/app/model/note.model';
import { Label } from 'src/app/model/label.model';
import { HttpserviceService } from 'src/app/services/httpservice.service';
import { LabelDto } from 'src/app/model/labelDto.model';
import { CardUpdateServiceService } from 'src/app/services/card-update-service.service';

@Component({
  selector: 'app-edit-label',
  templateUrl: './edit-label.component.html',
  styleUrls: ['./edit-label.component.scss']
})
export class EditLabelComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<EditLabelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Label[], private httpService: HttpserviceService,
    private snackbar: MatSnackBar, private cardUpdate: CardUpdateServiceService) { }

    labelName: string;

  ngOnInit() {
    console.log(this.data.length);
  }

  // onNoClick(): void {
  //   this.dialogRef.close();
  // }

  labelnameupdate(label: Label) {
    console.log(label);
    console.log(label.id);

    this.httpService.labelPutRequest('label/?labelId=' + label.id, label).subscribe(
      response => {
        if (response.statusCode === 100) {
          this.snackbar.open(response.statusMessage, 'success', { duration: 2000 });
          console.log(response);

        }
      }
    );
  }

  deleteLabel(label) {
    console.log(label);
    this.data = this.data.filter(l => l.id !== label.id);
    this.httpService.labelDeleteRequest('label/?labelId=' + label.id).subscribe(
      response => {
        if (response.statusCode === 100) {
          this.snackbar.open(response.statusMessage, 'success', { duration: 2000 });
          console.log(response);
          this.cardUpdate.updateMessage();
        }
      }
    );

  }

}


