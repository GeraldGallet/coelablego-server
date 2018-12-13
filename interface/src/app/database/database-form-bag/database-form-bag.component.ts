import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';

import { Piece } from 'src/app/shared/models';

@Component({
  selector: 'app-database-form-bag',
  templateUrl: './database-form-bag.component.html',
  styleUrls: ['./database-form-bag.component.css']
})
export class DatabaseFormBagComponent implements OnInit {

  @Input() pieces$: Observable<Piece[]>;

  constructor() { }

  ngOnInit() {
  }

}
