import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { HttpserviceService } from 'src/app/services/httpservice.service';
import { CardUpdateServiceService } from 'src/app/services/card-update-service.service';

@Component({
  selector: 'app-collaborator-dialog',
  templateUrl: './collaborator-dialog.component.html',
  styleUrls: ['./collaborator-dialog.component.scss']
})
export class CollaboratorDialogComponent implements OnInit {

  constructor(public dialogRef:MatDialogRef<CollaboratorDialogComponent>,
    private httpService:HttpserviceService,
    @Inject(MAT_DIALOG_DATA) private data,private matSnackBar:MatSnackBar,
    private updateService:CardUpdateServiceService) { }
    private email:string;
 
    ngOnInit() {
    console.log(this.data.notedetails.collabList);
  }
 
 
 
 
 
 
 
  // addCollaborator()
  // {
  //   this.dialogRef.close();
  //   this.userService.getCollabUserId(this.email).subscribe(
  //     (response:Number) =>
  //     {
  //       console.log(response);
  //       if(response >= 0)
  //       {
  //         this.notecrudservice.addCollaboratorNote(response,this.data.notedetails.note.id).subscribe(
  //           response =>
  //           {
  //             this.matsnackbar.open(response.statusMessage,"",{
  //               duration:2000,})
  //               this.noteupdateService.changemessage2();
  //           }
  //         )
  //       }
  //     }
  //   )
  // }

  // removeCollab(email)
  // {
  //   console.log(email);
  //   console.log(this.data.notedetails.note.id);
  //   this.notecrudservice.deleteCollaborator(this.data.notedetails.note.id,email).subscribe(
  //     (response) =>{
  //     console.log(response);
  //     this.matsnackbar.open(response.statusMessage,"",{
  //       duration:2000,})
  //       this.noteupdateService.changemessage2();

  //     }
  //     )
  //   }



}
