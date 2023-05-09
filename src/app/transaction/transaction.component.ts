import { Component } from '@angular/core';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent {


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
