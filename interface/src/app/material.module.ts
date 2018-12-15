import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
		MatListModule,
		MatRadioModule,
		MatFormFieldModule,
		MatInputModule,
		MatButtonToggleModule,
		MatIconModule,
		MatTabsModule,
		MatSelectModule,
		MatDialogModule
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
	MatTabsModule,
	MatSelectModule,
	MatDialogModule
  ],
  exports: [
    MatListModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
	MatButtonToggleModule,
	MatIconModule,
	MatTabsModule,
	MatSelectModule,
	MatDialogModule
  ]
})
export class MaterialModule { }
