import { Component } from '@angular/core';
import { FirebaseService } from '../firebase.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {
  user:any;
  error:any;
  public registerForm:any= {
    email: '',
    password: '',

  };
  constructor( public firebaseService:FirebaseService ){}
  onSubmit(): void {
    // Process checkout data here
    console.warn('Your order has been submitted', this.registerForm);
    this.signIn(this.registerForm);
  }
   public  onClick() {
      const function_name='testFunctionAuth';
      const data={"text":"moi"};
      this.firebaseService.callFunction(function_name,data).then(
        result => {
          console.log(result);
        }
      ).catch((error) => {
        this.error = error
        console.error(error);
        // ..
      });

  }
  public signIn(form: any) {
    console.log(form);
    if (form.register) {
      this.firebaseService.signIn(form)
      .then((userCredential) => {
        // Signed in
         this.user = userCredential.user;
        console.log(this.user);

        // ...
      })
      .catch((error) => {
        this.error = error
        console.error(error);
        // ..
      });
    }else{
      this.firebaseService.logIn(form)
      .then((userCredential) => {
        // Signed in
         this.user = userCredential.user;
        console.log(this.user);

        // ...
      })
      .catch((error) => {
        this.error = error
        console.error(error);
        // ..
      });
    }
    /*
    */
  }
}
