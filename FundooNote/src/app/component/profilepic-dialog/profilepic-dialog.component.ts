import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-profilepic-dialog',
  templateUrl: './profilepic-dialog.component.html',
  styleUrls: ['./profilepic-dialog.component.scss']
})
export class ProfilepicDialogComponent implements OnInit {

  
  // imageChangedEvent: any = '';
  // croppedImage;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  constructor(public dialogRef: MatDialogRef<ProfilepicDialogComponent>)
   { }

  ngOnInit() { }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  imageCropped(event:any) {
  console.log(event);
  this.croppedImage = event;
  }
   
  setProfile()
  {
    if(this.croppedImage!=null)
    {
      this.dialogRef.close(this.croppedImage);
    }
  }


}
