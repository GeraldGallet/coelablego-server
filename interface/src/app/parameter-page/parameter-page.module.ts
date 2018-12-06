import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParameterPageComponent } from './parameter-page.component';
import { MaterialModule } from 'src/app/material.module';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [ParameterPageComponent],
  imports: [
    CommonModule,
    MaterialModule,
    MatSelectModule
  ]
})
export class ParameterPageModule { }
