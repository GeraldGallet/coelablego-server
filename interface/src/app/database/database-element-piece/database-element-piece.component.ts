import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-database-element-piece',
  templateUrl: './database-element-piece.component.html',
  styleUrls: ['./database-element-piece.component.css']
})
export class DatabaseElementPieceComponent implements OnInit {

  @Input() id: string;
  @Input() color: string;
  @Input() shape: string;
  @Input() imgUrl: string;

  constructor() { }

  ngOnInit() {
  }

}
