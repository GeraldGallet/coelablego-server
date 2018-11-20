import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule, MatRadioModule, MatFormFieldModule, MatInputModule } from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatListModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule
  ],
  exports: [
    MatListModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class MaterialModule { }
