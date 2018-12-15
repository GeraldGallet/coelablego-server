import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MaterialModule } from 'src/app/material.module';
import { DatabaseService, SortService, SimulateDataService, ParameterService } from './services';
import { FilterPipe, BagFilterPipe } from './pipes';
import { BagDialogComponent } from './dialogs';

@NgModule({
  declarations: [
	FilterPipe,
	BagFilterPipe,
	BagDialogComponent	
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
	FilterPipe,
	BagFilterPipe
  ],
  exports: [
	FilterPipe,
	BagFilterPipe
  ]
})
export class SharedModule { }
