import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { PublicPage } from './public.page';
import { LoginPage } from './login/login.page';
import { ForgotPasswordPage } from './forgot-password/forgot-password.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {path: '', redirectTo: 'login', pathMatch: 'full'},
      {path: 'login', component: LoginPage},
      {path: 'forgot-password', component: ForgotPasswordPage}
    ])
  ],
  declarations: [PublicPage, LoginPage, ForgotPasswordPage],
  bootstrap: [PublicPage],
  exports: [PublicPage]
})
export class PublicPageModule {}
