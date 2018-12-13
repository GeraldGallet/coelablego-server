import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { DatabaseService } from 'src/app/shared/services';
import { Piece, Bag } from 'src/app/shared/models';

@Component({
  selector: 'app-database-view',
  templateUrl: './database-view.component.html',
  styleUrls: ['./database-view.component.css']
})
export class DatabaseViewComponent implements OnInit {

  pieces$: Observable<Piece[]>;
  bags$: Observable<Bag[]>;

  newBag = false;
  newPiece = false;

  constructor(private dbService: DatabaseService) { }

  ngOnInit() {
	this.fetchPieces();
	this.fetchBags();
  }

  fetchPieces() {
	this.pieces$ = this.dbService.getAllPieces();
  }

  fetchBags() {
	this.bags$ = this.dbService.getAllBags();
  }

  declareNewBag() {
	this.newBag = !this.newBag;
  }

  declareNewPiece() {
	this.newPiece = !this.newPiece;
  }

}
