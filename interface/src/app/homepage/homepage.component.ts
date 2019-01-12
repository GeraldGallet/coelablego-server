import { Component, OnInit } from '@angular/core';
import { Routes, Router } from '@angular/router';

import { environment } from 'src/environments/environment';
import { SortService, ArduinoService } from 'src/app/shared/services';
import { Bag } from 'src/app/shared/models';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  legoPicture = environment.assets.lego_picture;
  selectedSort: Bag;
  quantity: string;

  constructor(	private router: Router,
				private sortService: SortService,
				private arduinoService: ArduinoService) { }

  ngOnInit() {
    this.selectedSort = this.sortService.getSelectedSort();
  }

  startMachine() {
	this.arduinoService.startMachine(parseInt(this.quantity), this.selectedSort.id);
  }

  goToSearchpage() {
	this.router.navigate(['/search']);
  }
	
}
