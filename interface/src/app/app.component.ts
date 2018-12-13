import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';

import { environment } from 'src/environments/environment';
import { ParameterService } from './shared/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = environment.appName;
  logo = environment.assets.yncreaLogo;
  color: string;
  colorSubject: Subscription;
  constructor(private parameterService: ParameterService) {}

  ngOnInit() {
  this.colorSubject = this.parameterService.colorCodeSubject.subscribe(
    (data: string) => {
      console.log(data);
      this.color = data;
    }
  );
  this.parameterService.emitColorCodeSubject();
  }
}
