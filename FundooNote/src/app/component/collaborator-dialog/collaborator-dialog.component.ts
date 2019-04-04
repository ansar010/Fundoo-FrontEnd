import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { HttpserviceService } from 'src/app/services/httpservice.service';
import { CardUpdateServiceService } from 'src/app/services/card-update-service.service';
import { UserInfo } from 'src/app/model/userinfo.model';
import { CollabedUserInfo } from 'src/app/model/CollabedUserInfo.model';
import { NoteModel } from 'src/app/model/note.model';
import { Response } from 'selenium-webdriver/http';

@Component({
  selector: 'app-collaborator-dialog',
  templateUrl: './collaborator-dialog.component.html',
  styleUrls: ['./collaborator-dialog.component.scss']
})
export class CollaboratorDialogComponent implements OnInit {

  userInfo: UserInfo;
  token: string = localStorage.getItem('token');
  // collabUserId: LongRange;
  collabUserInfo: CollabedUserInfo[];
  collabUserMail: string;
  constructor(public dialogRef: MatDialogRef<CollaboratorDialogComponent>,
    private httpService: HttpserviceService,
    @Inject(MAT_DIALOG_DATA) private data: NoteModel, private matSnackBar: MatSnackBar,
    private updateService: CardUpdateServiceService) {
    this.httpService.getUserInfo().subscribe(
      (response: UserInfo) => {
        console.log(response.name);
        this.userInfo = response;
      }
    );
  }


  ngOnInit() {
    this.getCollabUserInfo();
    if (this.data.title === 'secondUserNote2') {
      console.log('different user id ' + this.data.user.userId);
    }
    // console.log(this.data.notedetails.collabList);
    console.log(this.data.id);

  }

  getCollabUserInfo() {
    this.httpService.getCollabedUserInfo('?noteId=' + this.data.id).subscribe(
      users => {
        console.log(users.length);
        this.collabUserInfo = users;
        this.collabUserInfo = users;
        console.log(this.collabUserInfo);
        console.log('collab user length' + this.collabUserInfo.length);

      }

    );
  }

  // enteredEmail() {
  //   console.log('email', email);
  //   this.collabUserMail = email;
  // }

  save() {
    this.httpService.addCollaborator('note/addcollaborator?noteId=' + this.data.id + '&userMailId=' + this.collabUserMail).subscribe(
      response => {
        // if (response.statusCode === 100) {
        //   this.matSnackBar.open(response.statusMessage, 'success', { duration: 2000 });
        //   this.getCollabUserInfo();
        // } else {
        //   this.matSnackBar.open(response.statusMessage, 'Fail', { duration: 2000 });

        // }
      }
    );
  }

  addCollaborator() {
    this.httpService.addCollaborator('note/addcollaborator?noteId=' + this.data.id + '&userMailId=' + this.collabUserMail).subscribe(
      response => {
        if (response.statusCode === 100) {
          this.matSnackBar.open(response.statusMessage, 'success', { duration: 2000 });
          this.getCollabUserInfo();
          this.collabUserMail = '';
        } else {
          this.matSnackBar.open(response.statusMessage, 'Fail', { duration: 2000 });

        }
      }
    );
  }

  removeCollaborator(email: string) {
    console.log(email);
    this.httpService.addCollaborator('note/removecollaborator?noteId=' + this.data.id + '&userMailId=' + email).subscribe(
      response => {
        if (response.statusCode === 100) {
          this.matSnackBar.open(response.statusMessage, 'success', { duration: 2000 });
          this.getCollabUserInfo();
        } else {
          this.matSnackBar.open(response.statusMessage, 'Fail', { duration: 2000 });

        }
      }
    );
  }
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







// private userName:string;
//   private user:UserInfo=new UserInfo();
//   private userInfos:UserInfo[];
//   private emailId:string;
//   private show:boolean;
//   private userId:LongRange;
//   private userId2:LongRange;
//   private collab=new AllNotes();
//   private userInfoList= new Array<UserInfo>();


//   private userIds=new Array<LongRange>();
//   constructor(
//     public dialogRef: MatDialogRef<CollabDialogComponent>,
//     @Inject(MAT_DIALOG_DATA)private  data:AllNotes,
//     private userService:UserService,
//     private collabService:CollaboratorService,
//     private snackBar:MatSnackBar
//     ) {
//       this.userInfos=data.collabUserInfos;
//       this.getOwnerDetails();
//     }
//   ngOnInit() {

//   }

//   getOwnerDetails()
//   {

//      this.userIds.push(this.data.note.userId);
//      this.userService.collabDetails(this.userIds).subscribe(
//        result=>
//        {
//          this.user=result.pop();
//          this.userName=this.user.userName;
//          this.emailId=this.user.emailId;
//        }
//      )
//   }

//   getUser(emailId:string)
//   {
//     this.userService.getUserBtEmailId(emailId).subscribe(
//       (data)=>
//       this.userId=data
//     )
//   }

//   addCollab()
//   {
//       let collab=new CollaboratorDto();
//       collab.noteId=this.data.note.noteId;
//       collab.userId= this.userId;
//       console.log(collab);
//       this.collabService.addCollaborator(collab).subscribe(
//         (response:any)=> {
//         if(response.statusCode==200){
//         this.snackBar.open(response.statusMessage,"",{duration:3000});
//       }
//       else{
//         this.snackBar.open("Enter valid email","",{duration:3000})

//       }
//     }
//       ) 
//   }

//   removeCollab(emailId:string)
//   {
//     this.userInfoList.push(this.userInfos.filter(userInfo=> userInfo.emailId==emailId).pop());
//     this.userInfos=this.userInfos.filter(userInfo=> userInfo.emailId!==emailId);
//   }

//   save(){
//     let thisNote=new AllNotes();
//     thisNote.note=this.data.note;
//     thisNote.collabUserInfos=this.userInfoList;
//     this.collabService.removeCollaborator(thisNote).subscribe(
//       (response:any)=> 
//       this.snackBar.open("Collaborator saved", "", {duration: 3000})
//     );
//   }
