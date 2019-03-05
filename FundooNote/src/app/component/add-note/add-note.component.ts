/************************************************************************************************
*
*  Purpose         : To Add Notes
*
*  Description     : Add Notes Api and CheckList Api's
*
*  @file           : addNotes.ts
*  @overview       : To Add Notes With reminders,colors,labels,checklist
*  @module         : addNotes.ts - This is optional if expeclictly its an npm or local package
*  @author         : Ansar
*  @since          : 5-3-2019
*
*************************************************************************************************/

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.scss']
})
export class AddNoteComponent implements OnInit {

   private hide: boolean = true;
  constructor() { }

  ngOnInit() {
  }

}
