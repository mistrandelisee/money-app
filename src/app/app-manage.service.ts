import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AppManageService {
  title = 'tuts';
  public baseRef = environment.baseRef;
  name = environment.name;
  code = environment.code;
  constructor() {
    console.log(`AppManageService: baseRef="${this.baseRef}`);

   }
}
