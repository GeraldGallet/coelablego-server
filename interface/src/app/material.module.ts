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
		MatSelectModule
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
		MatSelectModule
  ],
  exports: [
    MatListModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
		MatButtonToggleModule,
		MatIconModule,
		MatTabsModule,
		MatSelectModule
  ]
})
export class MaterialModule { }
