import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material';

import { Bag } from 'src/app/shared/models';
import { DatabaseService } from 'src/app/shared/services';
import { BagEditDialogComponent } from 'src/app/shared/dialogs';

@Component({
  selector: 'app-database-element-bag',
  templateUrl: './database-element-bag.component.html',
  styleUrls: ['./database-element-bag.component.css']
})
export class DatabaseElementBagComponent implements OnInit {

  @Input() bag: Bag;

  constructor(public dialog: MatDialog, private dbService: DatabaseService) { }

  ngOnInit() {
	console.log(this.bag);
  }

  openDialog() {
	const dialogRef = this.dialog.open(BagEditDialogComponent, {
		width: '600px',
		data: this.bag
	});

	dialogRef.afterClosed().subscribe(res => {
		if (res !== undefined) {
			this.dbService.putBag(this.bag);
		}
	});
  }

}
