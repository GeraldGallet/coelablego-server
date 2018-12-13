import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ParameterService } from '../shared/services/parameter/parameter.service';
import { FormControl, Validators } from '@angular/forms';
import { Routes, Router } from '@angular/router';

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
    "Rouge"
  ];

  constructor(private parameterService: ParameterService, private router: Router) { }

  ngOnInit(){
  }

  themeButton(){
    console.log("coucou");
    this.parameterService.setColor(this.colorSelect);
    this.router.navigate(['/home']);
  }
}
