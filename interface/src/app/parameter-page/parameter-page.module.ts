import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ParameterPageComponent } from './parameter-page.component';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [ParameterPageComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
	MaterialModule,
	SharedModule
  ]
})
export class ParameterPageModule { }
