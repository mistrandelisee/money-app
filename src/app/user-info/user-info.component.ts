import { Component, Input } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { ToastService } from '../toast.service';
import { user , USER_FUNCTION} from 'src/types/user';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent {
  constructor(public routes:ActivatedRoute,private _router:Router ,private firebase:FirebaseService, public toastservice: ToastService){}
  @Input() id:string='';
  public user:any={}
  @Input()
  editable:boolean=false;
  action='';
  public get title() : string {
    return `${this.user?.firstname|| ''}  ${this.user?.lastname|| ''}` || this.user?.email
   }
  public get ownerProps() : any[] {
    return Object.entries(this.user?.owner|| {});
  }
  public  buildProps(prop:string) : any[] {
    try {
      return Object.entries(this.user[prop]|| {});
    } catch (error) {
      return [];
    }

  }
  // get statesopts():any[] {return REQUEST_STATES}
  public get userProps() : any[] {
    return Object.entries({...this.user/*,owner:'',bank:'',inZone:'',outZone:'',receiver:'',deposit:''
    ,createdDate: (this.user?.createdDate)? JSON.stringify(this.user?.createdDate): null

  */}|| {});
  }
  get isUpdatable(): boolean {
    return !this.isDeleted && this.user?.status != 'WORKING_STATE';
  }
  get isDeleted(): boolean {
    return this.user?.status == 'DELETED';
  }
  get isEdit(){
    return this.action == 'EDIT';
  }
  get isChange(){
    return this.action == 'CHANGE';
  }
  ngOnInit(): void {
    if(this.id) this.getUser()
  }
  public getUser(){
    this.user= this.firebase.transferts.find(x=>x.id==this.id);

    const data=user.buildGetInfo(this.id)
    this.firebase.callFunction(USER_FUNCTION,data).then(
      (_data:any)=>{
        console.log(_data);

        if(_data?.body)
          this.user= _data?.body
          else
          this.user={}
      }
    )
    .catch((err:any)=>{
      console.error(err);
    })
  }
  public doChange(): void {
    this.action='CHANGE';
  }
  public doEdit(): void {
    this.action = 'EDIT';
  }
  public doDelete(): void {
    this.action='DELETE';
    this.deleteRequest()
  }
  doBack(){
    this.action='BACK';
    this.getUser()
  }
  goto(pathname:string){
    this._router.navigateByUrl(pathname)
  }
  public deleteRequest(){
    const data=user.buildDeleteRequest(this.id)


    this.firebase.callFunction(USER_FUNCTION,data).then(
      (_data:any)=>{
        console.log(_data);
        this.showSuccessToast('Success',_data?.message )
      }
    )
    .catch(err=>{
      console.error(err);
      // this.showErrorToast(err?.body, err?.message)
    })
    .finally(() => {
      this.goto('/users')

    })

  }
  public doSaveModal(event: any):void{
    console.log('save modal');
    console.log(event);


  }
  close(){
    this.action='BACK';
  }


  showSuccessToast(title:string,body:string){
    this.toastservice.open('success',title,body)

  }
}
