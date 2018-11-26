import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule, MatRadioModule, MatFormFieldModule, MatInputModule, MatButtonToggleModule } from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatListModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
	MatButtonToggleModule
  ],
  exports: [
    MatListModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
	MatButtonToggleModule
  ]
})
export class MaterialModule { }
