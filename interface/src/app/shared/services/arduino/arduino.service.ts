import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { ArduinoResponse } from 'src/app/shared/models';

@Injectable({
  providedIn: 'root'
})
export class ArduinoService {

  options = {
	headers: new HttpHeaders({
		'Content-Type': 'application/json'
	})
  };

  constructor(private httpClient: HttpClient) { }

  startMachine(quantity: number, bag: string) {
	let body = {
		"number": quantity,
		"bag": bag
	};

	this.httpClient.post(environment.apiUrl + "start", body, this.options)
		.subscribe(res => {
			console.log(res);
		});
  }

  beginNewPiece(nbOfPictures: number) {
	let body = {
		"number": nbOfPictures
	};

	this.httpClient.post(environment.apiUrl + "begin_new_piece", body, this.options)
		.subscribe(res => {
			console.log(res);
		});
  }

  takePicture(picture: number): Observable<string> {
	let body = {
		"actual": picture
	};

	return this.httpClient.post(environment.apiUrl + "new_photo_new_piece", body, this.options)
		.pipe(map((res: ArduinoResponse) => {
			console.log(res);
			return new ArduinoResponse().deserialise(res).data.url;
		}));
  }

  saveNewPiece(save: boolean) {
	let body = {
		"save": save
	};

	this.httpClient.post(environment.apiUrl + "save_new_piece", body, this.options)
		.subscribe(res => {
			console.log(res);
		});
  }

}
