import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { NoteModel } from 'src/app/model/note.model';
import { Label } from 'src/app/model/label.model';
import { HttpserviceService } from 'src/app/services/httpservice.service';

@Component({
  selector: 'app-edit-label',
  templateUrl: './edit-label.component.html',
  styleUrls: ['./edit-label.component.scss']
})
export class EditLabelComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<EditLabelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Label[], private httpService: HttpserviceService,
    private snackbar: MatSnackBar) { }
  // Label: string;
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
    // this.noteCurdService.deleteLabel(deleteLabel.id).subscribe(
    //   response =>
    //   {
    //     console.log(response);
    //     this.noteCurdService.getAllLabels().subscribe(
    //       response=>
    //       {
    //       //  console.log('sdfgsdfgsfgd'+response);
    //       //  this.data=response;
    //      //   console.log(response);
    //       })
    //   }
    // )
    // console.log(deleteLabel.id);
  }

}


// constructor(public dialogRef: MatDialogRef<EditlabeldialogComponent>,
//   @Inject(MAT_DIALOG_DATA) private data: Label[],private noteCurdService:NotecrudService) {
// }

// Label:string;

// ngOnInit() {
//   console.log(this.data);
// }

// onNoClick(): void {
//   this.dialogRef.close();
// }

// labelnameupdate(updateLabel:Label)
// {
//   console.log(updateLabel);
//   this.noteCurdService.updateLabel(updateLabel).subscribe(
//     response=>
//     {
//      console.log(response);
//     }
//   );
// }

// deleteLabel(deleteLabel)
// {
//   console.log(deleteLabel);

//   this.noteCurdService.deleteLabel(deleteLabel.id).subscribe(
//     response =>
//     {
//       console.log(response);
//       this.noteCurdService.getAllLabels().subscribe(
//         response=>
//         {
//         //  console.log('sdfgsdfgsfgd'+response);
//         //  this.data=response;
//        //   console.log(response);
//         })
//     }
//   )
//   // console.log(deleteLabel.id);
// }

// }
