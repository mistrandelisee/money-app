import { Component } from '@angular/core';

@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html',
  styleUrls: ['./hotel-list.component.css']
})
export class HotelListComponent {
  public title = 'Hotel List';
  public hotels: any[] = [{
    id: 1,
    name: 'John',
    description: 'big hotel',
  }];



  public getDate(){
    return new Date();
  }
}
