import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material';

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

  nbOfPictures: number;
  pictureNb = 0;
  pictures = [];

  constructor(public dialog: MatDialog, private arduinoService: ArduinoService) { }

  ngOnInit() {
  }

  startNewPiece(nb: number) {
	this.arduinoService.beginNewPiece(nb);
  }

  takePicture() {
	this.pictureNb++;
	this.pictureUrl$ = this.arduinoService.takePicture(this.pictureNb);
	this.pictureUrl$.subscribe(picture => {
		this.pictures.push(picture);
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
	this.stepper.reset();
  }

}
