import { Component, OnInit } from '@angular/core';
import { Routes, Router } from '@angular/router';
import { FormControl } from '@angular/forms';

import { HomepageComponent } from 'src/app/homepage/homepage.component';
import { SortService } from 'src/app/shared/services';
import { FilterPipe } from 'src/app/shared/pipes/filter/filter.pipe';

@Component({
  selector: 'app-searchpage',
  templateUrl: './searchpage.component.html',
  styleUrls: ['./searchpage.component.css']
})
export class SearchpageComponent implements OnInit {

  myControl = new FormControl();

  packets = ['Item 1', 'Item 2', 'Item 3', 'Packet 1', 'Packet 2', 'Packet 3'];

  search: string;

  constructor(private router: Router, private sortService: SortService, private filterPipe: FilterPipe) { }

  ngOnInit() {
  }

  searchPacket() {
	console.log("Button clicked");
  }

  selectPacket(packet: string) {
	this.sortService.setSelectedSort(packet);
  }

  goToSorting() {
	this.router.navigate(['/home']);
  }

}
