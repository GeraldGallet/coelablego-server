import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Piece, Bag, ServerResponse } from 'src/app/shared/models';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private httpClient: HttpClient) { }

  getAllPieces(): Observable<Piece[]> {
	return this.httpClient.get<ServerResponse>(environment.apiUrl + "piece")
		.pipe(map((res: ServerResponse) => {
			return new ServerResponse().deserialise(res).data
				.map((piece: Piece) => {
					return new Piece().deserialise(piece);
				});
		}));
  }

/*  postPiece(piece: Piece): Observable<Piece[]> {
	let body = JSON.stringify(piece);

	return this.httpClient.post<ServerResponse>(environment.apiUrl + "piece", body)
		.pipe(map((res: ServerResponse) => {
			return new ServerResponse().deserialise(res).data
				.map((piece: Piece) => {
					return new Piece().deserialise(piece);
				});
		}));
  } */

  /* postPiece(piece: Piece) {
	let body = JSON.stringify(piece);
	let options = {
		headers: new HttpHeaders({
			'Content-Type': 'application/json'
		})
	};

	this.httpClient.post<Piece>(environment.apiUrl + "piece", body, options)
		.subscribe(res => {
			console.log(res);
		});
  } */

  getPieceByShape(shape: string): Observable<Piece[]> {
	return this.httpClient.get<ServerResponse>(environment.apiUrl + "shape/" + shape)
		.pipe(map((res: ServerResponse) => {
			return new ServerResponse().deserialise(res).data
				.map((piece: Piece) => {
					return new Piece().deserialise(piece);
				});
		}));
  }

  getAllBags(): Observable<Bag[]> {
	return this.httpClient.get<ServerResponse>(environment.apiUrl + "bag")
		.pipe(map((res: ServerResponse) => {
			return new ServerResponse().deserialise(res).data
				.map((bag: Bag) => {
					return new Bag().deserialise(bag);
				});
		}));
  }

  getBagByName(name: string): Observable<Bag[]> {
	return this.httpClient.get<ServerResponse>(environment.apiUrl + "name/" + name)
		.pipe(map((res: ServerResponse) => {
			return new ServerResponse().deserialise(res).data
				.map((bag: Bag) => {
					return new Bag().deserialise(bag);
				});
		}));
  }

}
