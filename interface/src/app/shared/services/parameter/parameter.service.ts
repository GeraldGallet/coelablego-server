import { Injectable } from '@angular/core';
import { Subject, Observable, of} from 'rxjs';
import { map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ParameterService{

  color = '#55B460';
  colorCodeSubject = new Subject<string>();

  palette = [
    {
      name: 'Vert',
      code: '#55B460'
    },
    {
      name: 'Rouge',
      code: '#ED6262'
    },
    {
      name: 'Bleu',
      code: '#353dff'
    }
  ];

  constructor(){ }

  setColor(color:string){
    this.color = color;
    this.emitColorCodeSubject();
  }

  emitColorCodeSubject() {
    if (this.color ==='#55B460'){
      this.colorCodeSubject.next(this.color);
    }
    for (let i of this.palette) {
      if (this.color===i.name){
        this.colorCodeSubject.next(i.code);
      }
    }
  }
}
