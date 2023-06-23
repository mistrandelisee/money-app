
import { Component ,Input} from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { user ,USER_FUNCTION} from 'src/types/user';
import { stypes } from 'src/types/utils/datatable';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-list-view',
  templateUrl: './users-list-view.component.html',
  styleUrls: ['./users-list-view.component.css']
})
export class UsersListViewComponent {
  constructor(public firebase:FirebaseService, private router:Router){
    //this.firebase.users=[]
  }
  @Input()
  filterCallback:any=(elt:any)=>elt.role=='ADMIN';
  @Input()
  title:string='';
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

    {
      label:'created Date', fieldName:'createdDate',
    },
  ]
  // get users():any[]{
  //   return this.firebase.users;
  // }
  get _users():any[]{
    return this.users?.map(function(_user){
      return {..._user,
        name: _user.firstname || _user.lastname || _user.email}
    });
  }
  filterUsers():any[]{
    const self=this;
    return this.firebase.users?.filter(function(e){
      return self.filterCallback(e);
    }) || [];
  }
  ngOnInit(): void {
    //this.users=this.firebase.users

    try {
      this.users=this.filterUsers();
      console.log(this.users);
    } catch (error) {
      console.error(error);
      this.users=[]
    }


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
