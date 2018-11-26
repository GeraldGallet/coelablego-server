import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

import { SortService } from 'src/app/shared/services';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  legoPicture = environment.assets.lego_picture;
  selectedSort: string;

  constructor(private sortService: SortService) { }

  ngOnInit() {
    this.selectedSort = this.sortService.getSelectedSort();
  }

  demoSort(){
    if(this.selectedSort === 'none') {
      this.selectedSort = 'Test';
    } else {
      this.selectedSort = 'none';
    }
  }
}
