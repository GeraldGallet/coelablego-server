import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';

import { ArduinoService } from 'src/app/shared/services';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-database-add-piece',
  templateUrl: './database-add-piece.component.html',
  styleUrls: ['./database-add-piece.component.css']
})
export class DatabaseAddPieceComponent implements OnInit {

  @ViewChild('stepper') stepper;

  pictureUrl$: Observable<string>;
  pictureUrlTest: string;

  nbOfPictures: number;
  pictureNb = 0;
  pictures = [];

  constructor(private arduinoService: ArduinoService) { }

  ngOnInit() {
  }

  undoPicture() {
	this.pictureUrl$ = null;
	this.pictureUrlTest = null;
	this.pictures.pop();
  }

  takePicture() {
	this.pictureNb++;
	this.pictureUrl$ = this.arduinoService.takePicture(this.pictureNb);
	this.pictureUrl$.subscribe(picture => {
		this.pictureUrlTest = environment.pictureTest;
		//this.pictures.push(picture);
		this.pictures.push(this.pictureUrlTest);
	});
  }

  onSubmit(save: boolean) {
	this.arduinoService.saveNewPiece(save);
	this.reset();
  }

  reset() {
	this.pictureUrl$ = null;
	this.nbOfPictures = null;
	this.pictureNb = 0;
	this.pictures = [];
	this.pictureUrlTest = null;
	this.stepper.reset();
  }

}
