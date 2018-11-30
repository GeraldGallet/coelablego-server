import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatabaseElementComponent } from './database-element.component';

@NgModule({
  declarations: [DatabaseElementComponent],
  imports: [
    CommonModule
  ],
  exports: [
    DatabaseElementComponent
  ]
})
export class DatabaseElementModule { }
