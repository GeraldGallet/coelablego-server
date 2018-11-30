import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Bag } from 'src/app/shared/models';

@Injectable({
  providedIn: 'root'
})
export class SortService {

  private selectedSort: Bag;

  constructor() { }

  getSelectedSort(): Bag {
	return this.selectedSort || new Bag().deserialise({
		id: "1",
		name: "Sac Test",
		pieces: []
	});
  }

  setSelectedSort(sort: Bag) {
	this.selectedSort = sort;
  }

}
