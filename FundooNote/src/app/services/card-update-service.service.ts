import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpserviceService } from './httpservice.service';

@Injectable({
  providedIn: 'root'
})
export class CardUpdateServiceService {

private isArchive = 'false';
private isTrash  = 'false';

private obtainNotes = new BehaviorSubject([]);

currentNotes = this.obtainNotes.asObservable();

constructor(private httpService: HttpserviceService){
  console.log('update card constructor');
this.httpService.noteListsGetRequest('note/notelists',this.isArchive,this.isTrash).subscribe(
  response=>{
    this.obtainNotes.next(response);
    console.log(this.currentNotes);
  }
  // error=>
  // {

  // }
)  
}

  updateMessage(){
      this.httpService.noteListsGetRequest('note/notelists',this.isArchive,this.isTrash).subscribe(
        response=>
        {
          this.obtainNotes.next(response);
        }

      );
  }

changemessage(archive: string, trash: string) {
  this.isArchive = archive;
  this.isTrash = trash;
  this.httpService.noteListsGetRequest('note/notelists',archive, trash).subscribe(
    response => {

      console.log(response);
      this.obtainNotes.next(response);
    },
    error => {
      console.log(error);
    }
    );
  }
}

// updateMessage(){

// }
// changemessage() {
//     this.httpService.noteGetRequest().subscribe(
//     response => {

//       console.log(response);
//       this.obtainNotes.next(response);
//     },
//     error => {
//       console.log(error);
//     }
//   )
// }
// }
//   private allNotes = new BehaviorSubject([]);

//   currentnotes = this.allNotes.asObservable();

//   constructor(private httpService: HttpserviceService) {

//     console.log('card constructor');

//     this.httpService.noteGetRequest().subscribe(
//       response => {
//         console.log('response');

//         this.allNotes.next(response);

//       },

//       error => {
//         console.log(error);
//       }
//     );

//   }

//   ngOnInit(): void {

//   }


// }
