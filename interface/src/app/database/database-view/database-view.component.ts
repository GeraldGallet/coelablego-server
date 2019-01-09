import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material';

import { DatabaseService } from 'src/app/shared/services';
import { Piece, Bag } from 'src/app/shared/models';
import { BagDialogComponent } from 'src/app/shared/dialogs';
import { BagFilterPipe, PieceFilterPipe } from 'src/app/shared/pipes';

@Component({
  selector: 'app-database-view',
  templateUrl: './database-view.component.html',
  styleUrls: ['./database-view.component.css']
})
export class DatabaseViewComponent implements OnInit {

  pieces$: Observable<Piece[]>;
  bags$: Observable<Bag[]>;

  bagToPost = new Bag();
  pieceToPost = new Piece();

  constructor(
	public dialog: MatDialog,
	private dbService: DatabaseService,
	private bagFilterPipe: BagFilterPipe,
	private pieceFilterPipe: PieceFilterPipe) { }

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

  openBagDialog() {
	const dialogRef = this.dialog.open(BagDialogComponent, {
		width: '600px',
		data: this.bagToPost
	});

	dialogRef.afterClosed().subscribe(res => {
		if (res !== undefined) {
			console.log(res);
			this.dbService.postBag(this.bagToPost)
				.subscribe(bag => {
					console.log(bag);
				});			
		}
	});
  }

}
