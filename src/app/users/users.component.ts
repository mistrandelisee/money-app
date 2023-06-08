import { Component } from '@angular/core';
import { UserRole } from 'src/enum/user-role';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  role={
    manager:UserRole.manager,
    agent:UserRole.Agent,
  }
  srole=''
  constructor(){
  }
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
  public openNew(type:string){
    this.srole = type;
    this.mode='new';
  }
  onBack():void {
    this.mode='';
  }
}
