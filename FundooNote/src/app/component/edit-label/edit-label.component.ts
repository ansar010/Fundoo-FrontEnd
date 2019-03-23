import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { NoteModel } from 'src/app/model/note.model';
import { Label } from 'src/app/model/label.model';
import { HttpserviceService } from 'src/app/services/httpservice.service';
import { LabelDto } from 'src/app/model/labelDto.model';

@Component({
  selector: 'app-edit-label',
  templateUrl: './edit-label.component.html',
  styleUrls: ['./edit-label.component.scss']
})
export class EditLabelComponent implements OnInit {


  // private labelName: string;
  // private labelDto = new LabelDto();

  // constructor(public dialogRef: MatDialogRef<EditLabelComponent>,
  //   @Inject(MAT_DIALOG_DATA) private labels: Label[],
  //   private httpService: HttpserviceService,
  //   private snackBar: MatSnackBar) { }
  // private labelName: String;
  // private labelDto = new LabelDto();

  constructor(
    public dialogRef: MatDialogRef<EditLabelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Label[], private httpService: HttpserviceService,
    private snackbar: MatSnackBar) { }

  // ngOnInit() {
  // }


  // updateLabel(label: Label) {
  //   label.labelName = this.labelName;
  //    this.httpService.labelPutRequest('label/?labelId=' + label.id, label).subscribe(
  //   (response: any) => {
  //       this.snackBar.open(response.body.statusMessage, '', { duration: 2000, verticalPosition: 'top' });
  //     }
  //   );
  // }

  // updateLabel(label: Label) {
  //   label.labelName = this.labelName;
  //   this.labelService.updateLabel(label).subscribe(
  //     (response: any) => {
  //       this.snackBar.open(response.body.statusMessage, "", { duration: 2000, verticalPosition: "top" });
  //     }
  //   );
  // }

  // createLabel() {
  //   this.labelDto.labelName = this.labelName;
  //   this.labelService.createLabel(this.labelDto).subscribe(
  //     (response: any) => {
  //       this.getLabels();
  //       this.snackBar.open(response.body.statusMessage, "", { duration: 2000, verticalPosition: "top" });
  //     })
  // }

  // getLabels() {
  //   this.labelService.getLabels().subscribe
  //   {
  //     (data) => this.labels = data;
  //   }
  // }

  // onClick(): void {

  //   this.dialogRef.close();
  // }

  // deleteLabel(labelId: LongRange) {
  //   this.labels = this.labels.filter(label => label.labelId !== labelId);
  //   this.labelService.deleteLabel(labelId).subscribe(
  //     (response: any) => {
  //       this.getLabels();
  //       this.snackBar.open(response.statusMessage, "", { duration: 2000, verticalPosition: "top" })
  //     }
  //   )
  // }
  // focusInput(myInput) {

  //   myInput.focus();
  // }




    labelName: string;

  ngOnInit() {
    // console.log(this.abel.length)
    console.log(this.data);
    // console.log("label goo"+this.labelName);
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

    // this.noteCurdService.updateLabel(updateLabel).subscribe(
    //   response=>
    //   {
    //    console.log(response);
    //   }
    // );
  }

  deleteLabel(label) {
    console.log(label);

    this.httpService.labelDeleteRequest('label/?labelId=' + label.id).subscribe(
      response => {
        if (response.statusCode === 100) {
          this.snackbar.open(response.statusMessage, 'success', { duration: 2000 });
          console.log(response);

        }
      }
    );

  }

}


