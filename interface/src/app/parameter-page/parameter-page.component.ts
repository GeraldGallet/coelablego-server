import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl, Validators } from '@angular/forms';

import { ParameterService } from 'src/app/shared/services';

@Component({
  selector: 'app-parameter-page',
  templateUrl: './parameter-page.component.html',
  styleUrls: ['./parameter-page.component.css']
})
export class ParameterPageComponent implements OnInit {

  colorControl = new FormControl('', [Validators.required]);
  selectFormControl = new FormControl('', Validators.required);

  colorSelect: string;
  colors = [
    "Bleu",
    "Vert",
    "Rouge",
    "Noir"
  ];

  constructor(private parameterService: ParameterService) { }

  ngOnInit(){
  }

  themeButton(){
    this.parameterService.setColor(this.colorSelect);
  }
}
