import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
		MatListModule,
		MatRadioModule,
		MatFormFieldModule,
		MatInputModule,
		MatButtonToggleModule,
		MatIconModule,
		MatTabsModule
	} from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatListModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
	MatButtonToggleModule,
	MatIconModule,
	MatTabsModule
  ],
  exports: [
    MatListModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
	MatButtonToggleModule,
	MatIconModule,
	MatTabsModule
  ]
})
export class MaterialModule { }
