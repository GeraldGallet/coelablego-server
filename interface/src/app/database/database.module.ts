import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DatabaseElementPieceComponent } from './database-element-piece/database-element-piece.component';
import { DatabaseElementBagComponent } from './database-element-bag/database-element-bag.component';
import { DatabaseViewComponent } from './database-view/database-view.component';
import { MaterialModule } from 'src/app/material.module';
import { DatabaseFormBagComponent } from './database-form-bag/database-form-bag.component';
import { DatabaseFormPieceComponent } from './database-form-piece/database-form-piece.component';

@NgModule({
  declarations: [DatabaseElementPieceComponent, DatabaseElementBagComponent, DatabaseViewComponent, DatabaseFormBagComponent, DatabaseFormPieceComponent],
  imports: [
    CommonModule,
	MaterialModule
  ]
})
export class DatabaseModule { }
