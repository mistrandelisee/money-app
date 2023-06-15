import { Component } from '@angular/core';

import { FirebaseService } from '../firebase.service';
@Component({
  selector: 'app-testfire',
  templateUrl: './testfire.component.html',
  styleUrls: ['./testfire.component.css']
})
export class TestfireComponent {
  function_name:string='';
  isLoading:string='';
  result:any;
  error:any;
  record={
    elt1:'info',
    elt2:{in:555}
  }
  constructor( public firebaseService:FirebaseService ){}
  public  onClick() {
    // const function_name='testFunctionAuth';
    const data={"text":"moi"};
    this.isloading()
    this.firebaseService.callFunction(this.function_name,data).then(
      result => {
        console.log(result);
      }
    ).catch((error) => {
      this.error = {...error,message:error?.message}
      console.error(error);
      // ..
    })
    .finally(() => {this.isloading(false)});

  }
  public isloading(b:boolean=true){
    if (b) {
      this.isLoading='is loading...';
    }
    else this.isLoading='finished';

  }
}
