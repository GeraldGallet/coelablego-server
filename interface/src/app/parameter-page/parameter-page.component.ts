import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ParameterService } from '../shared/services/parameter/parameter.service';

@Component({
  selector: 'app-parameter-page',
  templateUrl: './parameter-page.component.html',
  styleUrls: ['./parameter-page.component.css']
})
export class ParameterPageComponent implements OnInit {

  colorSubscription = new Observable();
  color = '#55B460';
  colors = [
    "Bleu",
    "Vert",
    "Rouge"
  ];

  constructor(private parameterService: ParameterService) { }

  ngOnInit() {
    this.colorSubscription = this.parameterService.observeColor();
    this.parameterService.emitcolorSubject();
  }




}
