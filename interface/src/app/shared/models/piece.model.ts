import { Deserialisable } from './deserialisable.model';

export class Piece {
	id: string;
	color: string;
	shape: string;
	imgUrl: string;
	quantity = 0;

	deserialise(input: any): this {
		Object.assign(this, input);
		this.id = input._id;

		return this;
	}
}
