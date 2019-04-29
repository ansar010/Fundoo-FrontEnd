import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpserviceService } from './httpservice.service';

@Injectable({
  providedIn: 'root'
})
export class CardUpdateServiceService {

  private obtainNotes = new BehaviorSubject([]);
  private isArchive = 'false';
  private isTrash = 'false';

  private isLabelOnNotes: boolean = false;
  private labelName: string;

  currentNotes = this.obtainNotes.asObservable();


  // searchText = new BehaviorSubject('');
  // current_search  = this.searchText.asObservable();

  constructor(private httpService: HttpserviceService) {
    console.log('update card constructor');
    this.httpService.noteListsGetRequest('note/notelists', this.isArchive, this.isTrash).subscribe(
      response => {
        this.obtainNotes.next(response);
        console.log('data at card update comp: ', this.currentNotes);
      }
    );
  }

  updateMessage() {
    if (this.isLabelOnNotes === false) {
      this.httpService.noteListsGetRequest('note/notelists', this.isArchive, this.isTrash).subscribe(
        response => {
          this.obtainNotes.next(response);
        }

      );
    } else {
      this.httpService.getLabeledNote('note/labeledNote?labelName=' + this.labelName).subscribe
        (
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

  changemessage(archive: string, trash: string) {
    this.isArchive = archive;
    this.isTrash = trash;
    this.httpService.noteListsGetRequest('note/notelists', archive, trash).subscribe(
      response => {

        console.log(response);
        this.obtainNotes.next(response);
      },
      error => {
        console.log(error);
      }
    );
  }

  labelNotes(label: string) {
    this.labelName = label;
    this.isLabelOnNotes = true;
    this.httpService.getLabeledNote('note/labeledNote?labelName=' + label).subscribe
      (
        response => {
          console.log(response);
          this.obtainNotes.next(response);
        },
        error => {
          console.log(error);
        }
      );
  }

  searchNotes(textToSearch: String) {
    this.httpService.getSearchedNotes('note/searchnotes/' + textToSearch).subscribe(
      response => {
        this.obtainNotes.next(response);
      }
    );
  }

  // searchNotes(textToSearch: string) {
  //   console.log('service' + textToSearch);
  //   this.searchText.next(textToSearch);
  // }
}
