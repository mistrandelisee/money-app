import { Component } from '@angular/core';
import { FirebaseService } from './firebase.service';

import { Routes ,ActivatedRoute} from '@angular/router';
import { map,tap } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my app';
  open=false

  constructor(public routes:ActivatedRoute,public firebase: FirebaseService){ }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.


    this.routes.paramMap
    .pipe(map(params => params.get('id')), tap(id => (console.log(id))))
    .subscribe(id => {
    });
  }
  public get user(): any {
    const user=this.firebase.auth?.currentUser

    // console.log(user);

    return user
  }
  public get outpu(): any {


    console.log(this.routes.snapshot.root);

    return 'test'
  }
  public get isloading(): boolean  {
    return this.firebase.isloading
  }
  toggle(){
    this.open=!this.open;
  }
}
