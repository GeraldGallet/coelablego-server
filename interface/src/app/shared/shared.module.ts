import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DatabaseService, SortService, SimulateDataService } from './services';
import { FilterPipe } from './pipes';
import { BagFilterPipe } from './pipes/bag-filter/bag-filter.pipe';

@NgModule({
  declarations: [
	FilterPipe,
	BagFilterPipe
  ],
  imports: [
    CommonModule
  ],
  providers: [
	DatabaseService,
	SortService,
	SimulateDataService,
	FilterPipe,
	BagFilterPipe
  ],
  exports: [
	FilterPipe,
	BagFilterPipe
  ]
})
export class SharedModule { }
