import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParameterPageComponent } from './parameter-page.component';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [ParameterPageComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule
  ]
})
export class ParameterPageModule { }
