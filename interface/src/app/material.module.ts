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
		MatDialogModule,
		MatStepperModule,
		MatButtonModule
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
	MatDialogModule,
	MatStepperModule,
	MatButtonModule
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
	MatDialogModule,
	MatStepperModule,
	MatButtonModule
  ]
})
export class MaterialModule { }
