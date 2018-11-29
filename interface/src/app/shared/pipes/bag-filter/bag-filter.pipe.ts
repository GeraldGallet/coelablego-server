import { Pipe, PipeTransform } from '@angular/core';
import { Bag } from 'src/app/shared/models';

@Pipe({
  name: 'bagFilter'
})
export class BagFilterPipe implements PipeTransform {

  transform(bags: Bag[], searchText: string): Bag[] {
    if(!bags) return [];
	if(!searchText) return bags;

	searchText = searchText.toLowerCase();

	return bags.filter( bag => {
		return bag.name.toLowerCase().includes(searchText);
	});
  }

}
