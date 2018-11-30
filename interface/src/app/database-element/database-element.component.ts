import { Component, OnInit, Input  } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'app-database-element',
  templateUrl: './database-element.component.html',
  styleUrls: ['./database-element.component.css']
})
export class DatabaseElementComponent implements OnInit {

  @Input() type: string;
  @Input() index: number;

  //Common
  @Input() id: number;

  //Bags Specifics
  @Input() name: string;
  @Input() pieces: string[];

  //Piece Specifics
  @Input() color: string;
  @Input() shape: string;
  //Shape Rectangular Specific
    @Input() length: string[];
    @Input() height: string;
    @Input() width: string[];
  //Shape circle specific
    @Input() diameter: string[];

  constructor() { }

  ngOnInit() {
  }

}
