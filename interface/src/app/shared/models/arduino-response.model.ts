import { Deserialisable } from './deserialisable.model';

export class ArduinoResponse {
	data: {
		url: string
	};

	deserialise(input: any): this {
		Object.assign(this, input);

		return this;
	}
}
