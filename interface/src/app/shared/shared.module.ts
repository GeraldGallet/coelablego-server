import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MaterialModule } from 'src/app/material.module';
import { DatabaseService, SortService, ParameterService, ArduinoService } from './services';
import { BagFilterPipe, PieceFilterPipe } from './pipes';
import { BagDialogComponent, PieceConfirmDialogComponent, BagConfirmDialogComponent, BagEditDialogComponent } from './dialogs';

@NgModule({
  declarations: [
	BagFilterPipe,
	PieceFilterPipe,
	BagDialogComponent,
	PieceConfirmDialogComponent,
	BagConfirmDialogComponent,
	BagEditDialogComponent
  ],
  imports: [
    CommonModule,
	FormsModule,
	MaterialModule
  ],
  providers: [
	DatabaseService,
	SortService,
	ParameterService,
	ArduinoService,
	BagFilterPipe,
	PieceFilterPipe
  ],
  exports: [
	BagFilterPipe,
	PieceFilterPipe
  ]
})
export class SharedModule { }
