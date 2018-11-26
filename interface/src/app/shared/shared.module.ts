import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DatabaseService } from './services';
import { SortService } from './services';
import { FilterPipe } from './pipes';

@NgModule({
  declarations: [FilterPipe],
  imports: [
    CommonModule
  ],
  providers: [
	DatabaseService,
	SortService,
	FilterPipe
  ],
  exports: [
	FilterPipe
  ]
})
export class SharedModule { }
