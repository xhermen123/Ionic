import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { FamilyPage } from './family.page';
import { FamilyHomePage } from './home/home.page';
import { FamilyAttendancePage } from './attendance/attendance.page';
import { FamilySchedulePage } from './schedule/schedule.page';
import { FamilyProfilePage } from './profile/profile.page';
import { FamilyActivityPage } from './activity/activity.page';
import { ScheduleDetailPage } from '../modals/schedule-detail/schedule-detail.page';
import { AttendanceDetailPage } from '../modals/attendance-detail/attendance-detail.page';
import { ChangePasswordPage } from '../modals/change-password/change-password.page';
import { ModalPageModule } from '../modals/modals.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {path: 'home', component: FamilyActivityPage},
      {path: 'attendance', component: FamilyAttendancePage},
      {path: 'schedule', component: FamilySchedulePage},
      {path: 'profile', component: FamilyProfilePage},
      {path: 'activity', component: FamilyActivityPage}
    ]),
    ReactiveFormsModule,
    ModalPageModule
  ],
  entryComponents: [
    ChangePasswordPage,
    AttendanceDetailPage,
    ScheduleDetailPage
  ],
  declarations: [
    FamilyPage, 
    FamilyHomePage,
    FamilyAttendancePage, 
    FamilySchedulePage, 
    FamilyProfilePage,
    FamilyActivityPage
  ],
  bootstrap: [FamilyPage],
  exports: [FamilyPage]
})
export class FamilyPageModule {}
