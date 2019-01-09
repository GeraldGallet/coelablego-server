import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MaterialModule } from 'src/app/material.module';
import { DatabaseService, SortService, SimulateDataService, ParameterService, ArduinoService } from './services';
import { FilterPipe, BagFilterPipe, PieceFilterPipe } from './pipes';
import { BagDialogComponent, PieceConfirmDialogComponent, BagConfirmDialogComponent } from './dialogs';

@NgModule({
  declarations: [
	FilterPipe,
	BagFilterPipe,
	PieceFilterPipe,
	BagDialogComponent,
	PieceConfirmDialogComponent,
	BagConfirmDialogComponent	
  ],
  imports: [
    CommonModule,
	FormsModule,
	MaterialModule
  ],
  providers: [
	DatabaseService,
	SortService,
	SimulateDataService,
	ParameterService,
	ArduinoService,
	FilterPipe,
	BagFilterPipe,
	PieceFilterPipe
  ],
  exports: [
	FilterPipe,
	BagFilterPipe,
	PieceFilterPipe
  ]
})
export class SharedModule { }
