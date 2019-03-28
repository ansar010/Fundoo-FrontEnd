import { Component, OnInit } from '@angular/core';
import { NoteModel } from 'src/app/model/note.model';
import { CardUpdateServiceService } from 'src/app/services/card-update-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CurrentViewService } from 'src/app/services/current-view.service';

@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss']
})
export class LabelComponent implements OnInit {

  private gridView: boolean;
  private allnotes: NoteModel[];
  labelName: string;

  constructor(private cardUpdate: CardUpdateServiceService, 
              private router: Router, private activeRoute: ActivatedRoute,
              private view: CurrentViewService) {
  }

  ngOnInit() {
    this.view.currentView.subscribe(
      response => {
        this.gridView = response;
      }
    );
    // this.labelName = this.activeRoute.snapshot.params['labelName'];
    // console.log('Label name ' + this.labelName);

    // this.cardUpdate.labelNotes(this.labelName);

    //     this.cardUpdate.currentNotes.subscribe(updateNotes =>
    //       this.allnotes = updateNotes);
    // console.log(this.activeRoute.params);
    this.activeRoute.params.subscribe(
      response => {
        console.log('active Route->' + response.labelName);
        this.labelName = response.labelName;
        this.cardUpdate.labelNotes(this.labelName);

        this.cardUpdate.currentNotes.subscribe(updateNotes =>
          this.allnotes = updateNotes);

      }

    );
  }

}


// private  allnotes:ReceiveNote[];
// labelvalue:string; 

// constructor(private cardupdate:CardsupdateService,private router:Router,private activeRoute: ActivatedRoute) { 

// }

// ngOnInit() {

//   this.labelvalue=this.activeRoute.snapshot.params['labelvalue'];

//   this.cardupdate.labelNotes(this.labelvalue);

//     this.cardupdate.currentnotes2.subscribe(notes =>
//       {
//         this.allnotes=notes;
//       })

//     this.activeRoute.params.subscribe(
//       x=>
//       {
//         this.labelvalue=x.labelvalue;
//         this.cardupdate.labelNotes(this.labelvalue);
//         this.cardupdate.currentnotes2.subscribe(notes =>
//           {
//             this.allnotes=notes;
//           })
//       }
//     )
// }

// labelcheck(label:Label)
// {
//   if(label.labelName == this.labelvalue)
//   {
//       return true
//   }
//   else{
//     return false;
//   }
// }