import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs';

import { Piece, Bag } from 'src/app/shared/models';
import { DatabaseService } from 'src/app/shared/services';

@Component({
  selector: 'app-bag-edit-dialog',
  templateUrl: './bag-edit-dialog.component.html',
  styleUrls: ['./bag-edit-dialog.component.css']
})
export class BagEditDialogComponent implements OnInit {

  pieces: Piece[];

  constructor(
	public dialogRef: MatDialogRef<BagEditDialogComponent>,
	@Inject(MAT_DIALOG_DATA) public data: Bag,
	private dbService: DatabaseService) { }

  ngOnInit() {
	this.dbService.getAllPieces().subscribe( (pieces: Piece[]) => {
		this.pieces = pieces;
	});
  }

  onSubmit() {
	let selectedPieces = this.pieces.filter( piece => {
		return (piece.quantity !== 0);
	});
	for(var i = 0; i < selectedPieces.length; i++) {
		this.data.pieces[i] = [this.pieces[i].id, this.pieces[i].quantity.toString()];
	}

	this.dialogRef.close(this.data);
  }

  onCancel() {
	this.dialogRef.close();
  }

}
