import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomepageComponent } from './homepage.component';
import { MaterialModule } from 'src/app/material.module';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [HomepageComponent],
  imports: [
    CommonModule,
    MaterialModule,
    MatButtonModule
  ]
})
export class HomepageModule { }
