import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatabaseViewComponent } from './database-view.component';
import { MaterialModule } from 'src/app/material.module';

@NgModule({
  declarations: [DatabaseViewComponent],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class DatabaseViewModule { }
