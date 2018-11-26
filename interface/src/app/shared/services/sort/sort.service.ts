import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SortService {

  private selected_sort = "none"; //Will be used to link sort select page to homepage

  constructor() { }

}
