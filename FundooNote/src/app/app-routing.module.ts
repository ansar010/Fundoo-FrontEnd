import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { HomeComponent } from './component/home/home.component';
import { ForgetPasswordComponent } from './component/forget-password/forget-password.component';
import { ResetPassword } from './model/resetP.model';
import { ResetPasswordComponent } from './component/reset-password/reset-password.component';
import { DashBoardComponent } from './component/dash-board/dash-board.component';
import { NoteComponent } from './component/note/note.component';
import { ArchiveNoteComponent } from './component/archive-note/archive-note.component';
import { combineLatest } from 'rxjs';
import { TrashNoteComponent } from './component/trash-note/trash-note.component';
import { AuthGuardGuard } from './services/auth-guard.guard';
// import { NoteBarComponent } from './component/note-bar/note-bar.component';
// import { MaterialDashboardComponent } from './component/material-dashboard/material-dashboard.component';
// import { NoteComponent } from './component/note/note.component';
// import { NoteBarComponent } from './component/note-bar/note-bar.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },

  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'forgetPassword',
    component: ForgetPasswordComponent,
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'resetPassword/:token',
    component: ResetPasswordComponent
  },
  
  {
    canActivate: [AuthGuardGuard],
    path: 'dashboard',
    component: DashBoardComponent,
    children: [
      {
        path: '',
        component: NoteComponent
      },
      {
        path: 'addNote',
        component: NoteComponent
      },
      {
        path: 'archive',
        component: ArchiveNoteComponent
      },
      {
        path: 'trash',
        component: TrashNoteComponent
      }
    ]


  }
  // {
  //   path: 'dashBoard',
  //   component: MaterialDashboardComponent,
  //   children: [
  //     {

  //       path: '',
  //       component: NoteComponent
  //     },
  //     {
  //       path: 'addNote',
  //       component: NoteComponent,
  //       // children: [
  //       //   {
  //       //     path: '',
  //       //     component: NoteBarComponent
  //       //   }
  //       // ]
  //     }
  //   ]
  // }

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
