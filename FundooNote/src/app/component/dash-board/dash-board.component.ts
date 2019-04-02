import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';
import { EditLabelComponent } from '../edit-label/edit-label.component';
import { HttpserviceService } from 'src/app/services/httpservice.service';
import { Label } from 'src/app/model/label.model';
import { LabelDto } from 'src/app/model/labelDto.model';
import { CardUpdateServiceService } from 'src/app/services/card-update-service.service';
import { UserInfo } from 'src/app/model/userinfo.model';
import { ProfilepicDialogComponent } from '../profilepic-dialog/profilepic-dialog.component';
import { CurrentViewService } from 'src/app/services/current-view.service';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.scss']
})
export class DashBoardComponent implements OnInit, OnDestroy {
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  headerName: string;
  token: string = localStorage.getItem('token');
  allLabels: Label[];
  label: Label = new Label();
  labelDto: LabelDto = new LabelDto();
  userInfo: UserInfo;
  gridView: boolean;

  constructor(private router: Router, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher
    , private dialog: MatDialog,
    private httpService: HttpserviceService,
    private snackBar: MatSnackBar,
    private cardUpdate: CardUpdateServiceService,
    private view: CurrentViewService) {

    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    // this.getLabels();
    this.httpService.getUserInfo().subscribe(
      (response: UserInfo) => {
        console.log(response.name);

        this.userInfo = response;
      }
    );
  }
  ngOnInit() {
    this.headerName = 'FundooNote';

    this.view.currentView.subscribe(
      response => {
        this.gridView = response;
      }
    );

    this.httpService.getAllLabelRequest('label/').subscribe(
      response => {
        console.log(response.values);
        this.allLabels = response;
        console.log(this.allLabels.length);
      }
    );

    // this.httpService.getUserInfo().subscribe(
    //   (response: UserInfo) => {
    //     console.log(response.name);

    //     this.userInfo = response;
    //   }
    // );



    //   this.notecrudservice.getAllLabels().subscribe(
    //     response=>
    //     {
    //       this.labelsall=response;
    //       //console.log(this.labelsall.length);
    //     }
    // );
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }




  // Method to edit label
  OpenEditLabel() {

    const dialogRef = this.dialog.open(EditLabelComponent, {
      width: '300px',
      // height: '350px',
      data: this.allLabels
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // console.log('Label name' + result.labelName);
      if (result != null && result !== '') {
        this.labelDto.labelName = result;
        this.httpService.labelPostRequest('label/', this.labelDto).subscribe(
          response => {
            if (response.statusCode === 100) {
              this.snackBar.open(response.statusMessage, 'success', { duration: 2000 });
              this.cardUpdate.updateMessage();
            } else {
              this.snackBar.open(response.statusMessage, 'fail', { duration: 2000 });

            }
            console.log(response);
            this.httpService.getAllLabelRequest('label/').subscribe(
              response => {
                this.allLabels = response;
              }
            );
          }
        );
      } else {
        this.httpService.getAllLabelRequest('label/').subscribe(
          response => {
            this.allLabels = response;
          }
        );
      }
    });
  }

  getMoreInformation(): string {
    return 'Google Account \n ' + this.userInfo.name + '\n' + this.userInfo.email;
  }

  changeView() {
    this.view.onViewChange();
    console.log('GridView:' + this.gridView);
  }

  signOut() {
    localStorage.clear();
    this.router.navigate(['login']);
  }

  ProfileSelect() {
    const dialogRef = this.dialog.open(ProfilepicDialogComponent, {
      width: '300px',
      // height:'350px'
    });

    dialogRef.afterClosed().subscribe(
      (image: any) => {
        console.log('image' + image.file);
        if (image != null) {
          this.httpService.uploadProfilePic(image.file).subscribe(
            response => {
              if (response.statusCode === 100) {
                this.snackBar.open(response.statusMessage, 'success', { duration: 2000 });
                this.cardUpdate.updateMessage();
              } else {
                this.snackBar.open(response.statusMessage, 'fail', { duration: 2000 });

              }
            }
          );
        }
      });
  }

}






// EditLabelDialog()
//   {
//     const dialogRef = this.dialog.open(EditlabeldialogComponent, {
//       width: '300px',
//       height:'350px',
//       data: {labelsall:this.labelsall}
//     });

//     dialogRef.afterClosed().subscribe(result => {
//         if(result!=null && result!='')
//         {
//           this.label.labelName=result;
//           this.notecrudservice.createLabel(this.label).subscribe(
//               response =>
//               {
//                console.log(response);
//                this.notecrudservice.getAllLabels().subscribe(
//                 response =>
//                   {
//                     this.labelsall=response;
//                   }
//               )
//               }
//             )
//         }
//         else{
//           this.notecrudservice.getAllLabels().subscribe(
//             response =>
//               {
//                 this.labelsall=response;
//               }
//           )
//         }

//     });
//   }
