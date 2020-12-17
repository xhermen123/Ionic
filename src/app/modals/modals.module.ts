import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SignaturePadModule } from 'angular2-signaturepad';

import { AttendanceDetailPage } from './attendance-detail/attendance-detail.page';
import { ScheduleDetailPage } from './schedule-detail/schedule-detail.page';
import { ChangePasswordPage } from './change-password/change-password.page';
import { SignaturePage } from './signature/signature.page';
import { AddCommentModal } from './add-comment/add-comment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SignaturePadModule
  ],
  declarations: [AttendanceDetailPage, ScheduleDetailPage, ChangePasswordPage, SignaturePage, AddCommentModal],
  exports: [AttendanceDetailPage, ScheduleDetailPage, ChangePasswordPage, SignaturePage, AddCommentModal]
})
export class ModalPageModule {}
