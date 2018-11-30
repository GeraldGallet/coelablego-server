import { Deserialisable } from './deserialisable.model';

export class ServerResponse {
	data: any[];
	message: string;

	deserialise(input: any): this {
		Object.assign(this, input);
		
		return this;
	}
}
