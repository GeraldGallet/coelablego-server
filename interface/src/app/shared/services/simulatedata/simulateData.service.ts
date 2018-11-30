import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SimulateDataService {

  databaseSubject = new Subject<any[]>();
  nameShowed = "Pieces";

  private bags = [
    {
      id: 1,
      name: "Sac 1",
      pieces: [101,102]
    },
    {
      id: 2,
      name: "Sac 2",
      pieces: [101,101,102]
    }
  ]

  private pieces = [
    {
      id:101,
      color:"#00FF00",
      length: 12,
      height: 4,
      width: 12,
      shape: "rectangle"
    },
    {
      id:102,
      color:"#0000FF",
      diameter : 12,
      shape: "circle"
    }
  ]

  emitDatabaseSubject() {
    if(this.nameShowed==="Bags"){
      console.log("Bags emited");
      this.databaseSubject.next(this.bags.slice());
    }
    else{
      console.log("Pieces emited");
      this.databaseSubject.next(this.pieces.slice());
    }
  }

  affectName(value: string){
    this.nameShowed = value
    return value;
  }
}
