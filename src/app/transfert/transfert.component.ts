import { Component } from '@angular/core';

@Component({
  selector: 'app-transfert',
  templateUrl: './transfert.component.html',
  styleUrls: ['./transfert.component.css']
})
export class TransfertComponent {

  mode='';
  get newmode():boolean {
      return this.mode=='new';
  }
  get listview():boolean {
    return this.mode=='list';
  }
  get nonemode():boolean {
    return this.mode=='';
  }
  public openNew(){
    this.mode='new';
  }
}
