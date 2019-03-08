import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpserviceService } from './httpservice.service';

@Injectable({
  providedIn: 'root'
})
export class CardUpdateServiceService {

  private allNotes = new BehaviorSubject([]);

  currentnotes = this.allNotes.asObservable();

  constructor(private httpService: HttpserviceService) {

    console.log('card constructor');

    this.httpService.noteGetRequest().subscribe(
      response => {
        console.log('response');

        this.allNotes.next(response);

      },

      error => {
        console.log(error);
      }
    );

  }

  ngOnInit(): void {

  }


}
