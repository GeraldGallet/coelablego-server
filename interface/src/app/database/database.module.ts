import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DatabaseViewComponent, DatabaseElementPieceComponent, DatabaseElementBagComponent } from '../database';
import { BagDialogComponent } from 'src/app/shared/dialogs';
import { MaterialModule } from 'src/app/material.module';

@NgModule({
  declarations: [DatabaseElementPieceComponent, DatabaseElementBagComponent, DatabaseViewComponent],
  imports: [
    CommonModule,
	MaterialModule
  ],
  entryComponents: [BagDialogComponent]
})
export class DatabaseModule { }
