import { Component, OnInit } from '@angular/core';
import { HttpserviceService } from 'src/app/services/httpservice.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {
  data: any;
  constructor(private httpService: HttpserviceService) { }

  ngOnInit() {
  }

  getNote() {
    this.httpService.getRequest1('/user/note/list')
      .subscribe(

        (response) => {
          console.log('success get notes', response);
          this.data = response['body'];
          console.log('in response', this.data);
        },
        (error) => {
          console.log('error', error);
        }
      );
  }

}
