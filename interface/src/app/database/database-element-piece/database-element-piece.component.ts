import { Component, OnInit, Input } from '@angular/core';

import { Piece } from 'src/app/shared/models';

@Component({
  selector: 'app-database-element-piece',
  templateUrl: './database-element-piece.component.html',
  styleUrls: ['./database-element-piece.component.css']
})
export class DatabaseElementPieceComponent implements OnInit {

  @Input() piece: Piece;

  constructor() { }

  ngOnInit() {
  }

}
