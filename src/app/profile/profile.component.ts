import { Component } from '@angular/core';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  constructor(public firebase: FirebaseService){ }

  public get id(): string {
    const user=this.firebase.auth?.currentUser
    return user?.uid;
  }

  get hasId():boolean{
    return !!this.id
  }
}
