import { Component } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { user ,USER_FUNCTION} from 'src/forms/user';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent {
  constructor(public firebase:FirebaseService){
    //this.firebase.users=[]
  }
  users:any[]=[]
  fields=[
    {
      label:'PHONE',
      key:'phone',
    },
    {
      label:'ROLE',
      key:'role',
    },
    ,
    {
      label:'STATUS',
      key:'status',
    },
  ]
  ngOnInit(): void {
    //this.users=this.firebase.users
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    const data=user.buildAdminGet()


    this.firebase.callFunction(USER_FUNCTION,data).then(
      (_data:any)=>{
        console.log(_data);
        this.users=_data.body;
        //this.firebase.users=this.users

      }
    )
    .catch((err:any)=>{
      //this.showErrorToast(err?.body, err?.message)
      //console.error(err);
      this.users=[]
    })

  }
  public get hastransferts() : boolean {
    return this.users?.length >0
  }
}
