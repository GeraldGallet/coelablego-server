import { Pipe, PipeTransform } from '@angular/core';
import { Piece } from 'src/app/shared/models';

@Pipe({
  name: 'pieceFilter'
})
export class PieceFilterPipe implements PipeTransform {

  transform(pieces: Piece[], searchText: string): Piece[] {
    if(!pieces) return [];
	if(!searchText) return pieces;

	searchText = searchText.toLowerCase();

	return pieces.filter( piece => {
		return (piece.shape.toLowerCase().includes(searchText) || 
				piece.color.toLowerCase().includes(searchText));
	});
  }

}
