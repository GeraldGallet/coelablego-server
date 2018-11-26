import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

import { SortService } from '../shared/services/sort/sort.service'
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  lego_picture = environment.assets.lego_picture;
  selected_sort;
  constructor(private sortService: SortService) { }

  ngOnInit() {
    this.selected_sort = this.sortService.selected_sort;
  }

  demoSort(){
    if(this.selected_sort === 'none') {
      this.selected_sort = 'Test';
    } else {
      this.selected_sort = 'none';
    }
  }
}
