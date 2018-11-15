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

  sayHi() {
	this.dbService.getHi()
	  .subscribe(data => {
		console.log(data);
		this.serverData = data as JSON;
	  });
  }

  getAllEmployees() {
	this.httpClient.get('http://127.0.0.1:5002/employees').subscribe(data => {
	  this.employeeData = data as JSON;
	  console.log(this.employeeData);
	})
  }

  getEmployee() {
	this.httpClient.get('http://127.0.0.1:5002/employees/1').subscribe(data => {
	  this.employee = data as JSON;
	  console.log(this.employee);
	})
  }
}
