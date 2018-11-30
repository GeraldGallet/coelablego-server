import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

import { SortService } from 'src/app/shared/services';
import { Bag } from 'src/app/shared/models';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  legoPicture = environment.assets.lego_picture;
  selectedSort: Bag;

  constructor(private sortService: SortService) { }

  ngOnInit() {
    this.selectedSort = this.sortService.getSelectedSort();
  }

  demoSort(){
    if(this.selectedSort.name === 'none') {
      this.selectedSort.name = 'Test';
    } else {
      this.selectedSort.name = 'none';
    }
  }
}
