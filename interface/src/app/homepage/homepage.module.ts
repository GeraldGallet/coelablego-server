import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomepageComponent } from './homepage.component';
import { MaterialModule } from 'src/app/material.module';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [HomepageComponent],
  imports: [
    CommonModule,
	FormsModule,
    MaterialModule,
    MatButtonModule
  ]
})
export class HomepageModule { }
