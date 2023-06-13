import { Component } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { user ,USER_FUNCTION} from 'src/types/user';
import { stypes } from 'src/types/utils/datatable';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent {
  constructor(public firebase:FirebaseService, private router:Router){
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
  columns:any=[
    {
      label:'name', fieldName:'name',
      type:stypes.button
    },
    {
      label:'gender', fieldName:'gender',
    },
    {
      label:'email', fieldName:'email',
    },
    {
      label:'role', fieldName:'role',sortable:true
    },
    {
      label:'status', fieldName:'status',
    },
  ]
  get _users():any[]{
    return this.users?.map(function(_user){
      return {..._user,
        name: _user.firstname || _user.lastname || _user.email}
    });
  }
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
  public get hasusers() : boolean {
    return this.users?.length >0
  }
  onCkiclicked(row:any){
    this.goto('/users/'+row.id)
  }
  goto(pathname:string){
    this.router.navigateByUrl(pathname)
  }
}
