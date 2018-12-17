import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DatabaseViewComponent, DatabaseElementPieceComponent, DatabaseElementBagComponent } from '../database';
import { BagDialogComponent } from 'src/app/shared/dialogs';
import { MaterialModule } from 'src/app/material.module';
import { DatabaseAddPieceComponent } from './database-add-piece/database-add-piece.component';

@NgModule({
  declarations: [DatabaseElementPieceComponent, DatabaseElementBagComponent, DatabaseViewComponent, DatabaseAddPieceComponent],
  imports: [
    CommonModule,
	MaterialModule
  ],
  entryComponents: [BagDialogComponent]
})
export class DatabaseModule { }
