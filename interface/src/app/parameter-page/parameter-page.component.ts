import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ParameterService } from '../shared/services/parameter/parameter.service';
import { FormControl, Validators } from '@angular/forms';

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
