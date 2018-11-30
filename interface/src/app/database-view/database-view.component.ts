import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { SimulateDataService } from '../shared/services/simulatedata/simulateData.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-database-view',
  templateUrl: './database-view.component.html',
  styleUrls: ['./database-view.component.css']
})
export class DatabaseViewComponent implements OnInit {

  nameShowed= "Pieces";
  list: any[];
  type: string;
  listSubscription: Subscription;

  constructor(private simulateDataService:SimulateDataService) { }

  ngOnInit() {
    this.listSubscription = this.simulateDataService.databaseSubject.subscribe(
      (list: any[]) => {
        this.list = list;
      }
    );
    this.updateList();
  }

  ngOnDestroy() {
    this.listSubscription.unsubscribe();
  }

  affectName(value: string){
    this.nameShowed = this.simulateDataService.affectName(value);
    this.updateList();
  }

  updateList(){
    this.simulateDataService.emitDatabaseSubject();
    //Define if it's a bag or a piece
    if (this.list[0].hasOwnProperty('pieces')) {   //not a very good thing because element 0 has to exist
      // mean it's a piece
      this.type = 'Bag';
    }
    else{
      this.type = 'Piece';
    }
  }
}
