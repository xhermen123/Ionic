import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'public',
    pathMatch: 'full'
  },
  {
    path: 'public',
    loadChildren: './public/public.module#PublicPageModule'
  },
  {
    path: 'nurse',
    loadChildren: './nurse/nurse.module#NursePageModule'
  },
  {
    path: 'family',
    loadChildren: './family/family.module#FamilyPageModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
