import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule, MatRadioModule, MatFormFieldModule, MatInputModule, MatButtonToggleModule, MatIconModule } from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatListModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
	MatButtonToggleModule,
	MatIconModule
  ],
  exports: [
    MatListModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
	MatButtonToggleModule,
	MatIconModule
  ]
})
export class MaterialModule { }
