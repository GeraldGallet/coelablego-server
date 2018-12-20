import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { ServerResponse } from 'src/app/shared/models';

@Injectable({
  providedIn: 'root'
})
export class ArduinoService {

  constructor(private httpClient: HttpClient) { }

  startMachine(quantity: number, bag: string) {
	let body = {
		"number": quantity,
		"bag": bag
	};
	let options = {
		headers: new HttpHeaders({
			'Content-Type': 'application/json'
		})
	};

	this.httpClient.post(environment.apiUrl + "start", body, options)
		.subscribe(res => {
			console.log(res);
		});
  }
}
