import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule, MatRadioModule } from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatListModule,
    MatRadioModule
  ],
  exports: [
    MatListModule,
    MatRadioModule
  ]
})
export class MaterialModule { }
