import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { DatabaseService } from './shared/services';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Lego Sorter';
  logo = environment.assets.yncreaLogo;

  serverData: JSON;
  employeeData: JSON;
  employee: JSON;

  constructor(private httpClient: HttpClient, private dbService: DatabaseService) {}

  ngOnInit() {}

}
