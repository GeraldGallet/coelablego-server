import { Component, OnInit } from '@angular/core';
import { Routes, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

import { HomepageComponent } from 'src/app/homepage/homepage.component';
import { SortService } from 'src/app/shared/services';
import { DatabaseService } from 'src/app/shared/services';
import { BagFilterPipe } from 'src/app/shared/pipes';
import { Piece, Bag } from 'src/app/shared/models';

@Component({
  selector: 'app-searchpage',
  templateUrl: './searchpage.component.html',
  styleUrls: ['./searchpage.component.css']
})
export class SearchpageComponent implements OnInit {

  bags$: Observable<Bag[]>;
  pieces$: Observable<Piece[]>;

  constructor(
		private router: Router,
		private sortService: SortService,
		private dbService: DatabaseService,
		private bagFilterPipe: BagFilterPipe) { }

  ngOnInit() {
	this.fetchBags();
	this.fetchPieces();
  }

  selectBag(bag: Bag) {
	this.sortService.setSelectedSort(bag);
  }

  goToSorting() {
	this.router.navigate(['/home']);
  }

  fetchBags() {
	this.bags$ = this.dbService.getAllBags();
  }

  fetchPieces() {
	this.pieces$ = this.dbService.getAllPieces();
  }

}
