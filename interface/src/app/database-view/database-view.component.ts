import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-database-view',
  templateUrl: './database-view.component.html',
  styleUrls: ['./database-view.component.css']
})
export class DatabaseViewComponent implements OnInit {

  private bags = [
    {
      id: 1,
      name: "Sac 1",
      pieces: [101,102]
    }
  ]

  nameShowed= "Pieces/Bags";

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

  constructor() { }

  ngOnInit() {
  }

  affectName(value: string){
    this.nameShowed = value
  }
}
