import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { NursePage } from './nurse.page';
import { NurseHomePage } from './home/home.page';
import { NurseAttendancePage } from './attendance/attendance.page';
import { NurseProfilePage } from './profile/profile.page';
import { NurseSchedulePage } from './schedule/schedule.page';
import { NurseActivityPage } from './activity/activity.page';
import { ChangePasswordPage } from '../modals/change-password/change-password.page';
import { AttendanceDetailPage } from '../modals/attendance-detail/attendance-detail.page';
import { ScheduleDetailPage } from '../modals/schedule-detail/schedule-detail.page';
import { SignaturePage } from '../modals/signature/signature.page';
import { ModalPageModule } from '../modals/modals.module';
import { AddCommentModal } from '../modals/add-comment/add-comment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {path: 'home', component: NurseHomePage},
      {path: 'attendance', component: NurseAttendancePage},
      {path: 'profile', component: NurseProfilePage},
      {path: 'schedule', component: NurseSchedulePage},
      {path: 'activity', component: NurseActivityPage}
    ]),
    ReactiveFormsModule,
    ModalPageModule
  ],
  entryComponents: [
    ChangePasswordPage,
    AttendanceDetailPage,
    ScheduleDetailPage,
    SignaturePage,
    AddCommentModal
  ],
  declarations: [
    NursePage, 
    NurseHomePage, 
    NurseAttendancePage, 
    NurseProfilePage, 
    NurseSchedulePage,
    NurseActivityPage
  ],
  bootstrap: [NursePage],
  exports: [NursePage]
})
export class NursePageModule {}
