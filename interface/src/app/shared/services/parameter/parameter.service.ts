import { Injectable } from '@angular/core';
import { Subject, Observable} from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ParameterService {

  color = '#55B460';
  colorSubject = new Subject<string>();

  constructor() { }

  emitcolorSubject(){
    this.colorSubject.next(this.color);
  }

  observeColor():Observable<string>{
    return this.colorSubject.asObservable();
  }
}
