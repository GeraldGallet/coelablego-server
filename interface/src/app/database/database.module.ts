import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DatabaseElementPieceComponent } from './database-element-piece/database-element-piece.component';
import { DatabaseElementBagComponent } from './database-element-bag/database-element-bag.component';
import { DatabaseViewComponent } from './database-view/database-view.component';
import { MaterialModule } from 'src/app/material.module';

@NgModule({
  declarations: [DatabaseElementPieceComponent, DatabaseElementBagComponent, DatabaseViewComponent],
  imports: [
    CommonModule,
	MaterialModule
  ]
})
export class DatabaseModule { }
