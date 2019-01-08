import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material';

import { Bag } from 'src/app/shared/models';
import { DatabaseService } from 'src/app/shared/services';
import { BagDialogComponent } from 'src/app/shared/dialogs';

@Component({
  selector: 'app-database-element-bag',
  templateUrl: './database-element-bag.component.html',
  styleUrls: ['./database-element-bag.component.css']
})
export class DatabaseElementBagComponent implements OnInit {

  @Input() bag: Bag;

  bagToPost = new Bag();

  constructor(public dialog: MatDialog, private dbService: DatabaseService) { }

  ngOnInit() {
  }

  openDialog() {
	const dialogRef = this.dialog.open(BagDialogComponent, {
		width: '600px',
		data: this.bagToPost
	});

	dialogRef.afterClosed().subscribe(res => {
		if (res !== undefined) {
			this.dbService.postBag(this.bagToPost)
				.subscribe(bag => {
					console.log(bag);
				});
		}
	});
  }

}
