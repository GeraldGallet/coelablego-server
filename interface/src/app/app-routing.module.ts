import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotFoundErrorComponent } from './not-found-error/not-found-error.component';
import { HomepageComponent } from './homepage/homepage.component';
import { SearchpageComponent } from './searchpage/searchpage.component';

const routes: Routes = [
  { path: 'home', component: HomepageComponent },
  { path: 'search', component: SearchpageComponent },
  { path: '', component: HomepageComponent },
  { path: 'not-found', component: NotFoundErrorComponent},
  { path: '**', redirectTo: 'not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
