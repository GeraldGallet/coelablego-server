import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-database-element-bag',
  templateUrl: './database-element-bag.component.html',
  styleUrls: ['./database-element-bag.component.css']
})
export class DatabaseElementBagComponent implements OnInit {

  @Input() id: string;
  @Input() name: string;
  @Input() pieces: string[];
  @Input() imgUrl: string;

  constructor() { }

  ngOnInit() {
  }

}
