import { Component } from '@angular/core';
import { FirebaseService } from './firebase.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my app';
  open=false

  constructor(public firebase: FirebaseService){

  }
  public get user(): any {
    const user=this.firebase.auth?.currentUser

    // console.log(user);

    return user
  }
  public get isloading(): boolean  {
    return this.firebase.isloading
  }
  toggle(){
    this.open=!this.open;
  }
}
