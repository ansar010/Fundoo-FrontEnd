import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../app/core/material. module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { HomeComponent } from './component/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { ForgetPasswordComponent } from './component/forget-password/forget-password.component';
import { ResetPasswordComponent } from './component/reset-password/reset-password.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import 'hammerjs';
import { DashBoardComponent } from './component/dash-board/dash-board.component';
import { AddNoteComponent } from './component/add-note/add-note.component';
import { NoteComponent } from './component/note/note.component';
import { EditCardComponent } from './component/edit-card/edit-card.component';
import { NoteBarComponent } from './component/note-bar/note-bar.component';
import { ArchiveNoteComponent } from './component/archive-note/archive-note.component';
import { TrashNoteComponent } from './component/trash-note/trash-note.component';
import { TrashBarComponent } from './component/trash-bar/trash-bar.component';
import { DeleteCardComponent } from './component/delete-card/delete-card.component';
import { EditLabelComponent } from './component/edit-label/edit-label.component';
import { LabelComponent } from './component/label/label.component';
import { ProfilepicDialogComponent } from './component/profilepic-dialog/profilepic-dialog.component';
import { ImageCropperModule } from 'ngx-image-cropper';
// import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { DatePipe } from '@angular/common';
import { CollaboratorDialogComponent } from './component/collaborator-dialog/collaborator-dialog.component';
import { NoteFilterPipePipe } from './note-filter-pipe.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent,
    DashBoardComponent,
    AddNoteComponent,
    NoteComponent,
    EditCardComponent,
    NoteBarComponent,
    ArchiveNoteComponent,
    TrashNoteComponent,
    TrashBarComponent,
    DeleteCardComponent,
    EditLabelComponent,
    LabelComponent,
    ProfilepicDialogComponent,
    CollaboratorDialogComponent,
    NoteFilterPipePipe,

  ],
  imports: [
    FlexLayoutModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    ImageCropperModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule
  ],
  providers: [DatePipe],
  entryComponents : [EditCardComponent,
                    EditLabelComponent,
                    ProfilepicDialogComponent,
                    CollaboratorDialogComponent],

  bootstrap: [AppComponent]
})
export class AppModule { }
