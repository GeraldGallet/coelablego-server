import { Deserialisable } from './deserialisable.model';

export class Bag {
	id: string;
	name: string;
	pieces: string[];
	
	deserialise(input: any): this {
		Object.assign(this, input);
		this.id = input._id;

		return this;
	}
}
