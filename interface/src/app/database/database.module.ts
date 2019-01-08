import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DatabaseViewComponent, DatabaseElementPieceComponent, DatabaseElementBagComponent, DatabaseAddPieceComponent } from '../database';
import { BagDialogComponent } from 'src/app/shared/dialogs';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [DatabaseElementPieceComponent, DatabaseElementBagComponent, DatabaseViewComponent, DatabaseAddPieceComponent],
  imports: [
    CommonModule,
	FormsModule,
	MaterialModule,
	SharedModule,
  MatButtonModule
  ],
  entryComponents: [BagDialogComponent]
})
export class DatabaseModule { }
