import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs';

import { Piece, Bag } from 'src/app/shared/models';
import { DatabaseService } from 'src/app/shared/services';

@Component({
  selector: 'app-bag-dialog',
  templateUrl: './bag-dialog.component.html',
  styleUrls: ['./bag-dialog.component.css']
})
export class BagDialogComponent implements OnInit {

  pieces$: Observable<Piece[]>;

  constructor(
	public dialogRef: MatDialogRef<BagDialogComponent>,
	@Inject(MAT_DIALOG_DATA) public data: Bag,
	private dbService: DatabaseService) { }

  ngOnInit() {
	this.pieces$ = this.dbService.getAllPieces();
  }

  onCancel() {
	this.dialogRef.close();
  }

}
