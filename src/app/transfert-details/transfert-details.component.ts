import { Component, OnInit } from '@angular/core';
import { Router ,ActivatedRoute} from '@angular/router';

import { map,tap } from 'rxjs/operators';
import { FirebaseService } from '../firebase.service';
import { transfert,TRANSFERT_FUNCTION } from 'src/types/transfert';
import { ToastService } from '../toast.service';
import { stypes } from 'src/types/utils/form-item';
const WORKING_STATE='WORKING';
const REQUEST_STATES=[{
  label:'Open',value:'Open'},
  {label:'working',value:'Working'},
  {label:'request',value:'Request'},
  {label:'done',value:'Done'},
]
@Component({
  selector: 'app-transfert-details',
  templateUrl: './transfert-details.component.html',
  styleUrls: ['./transfert-details.component.css']
})
export class TransfertDetailsComponent implements OnInit {
  constructor(public routes:ActivatedRoute,private _router:Router ,private firebase:FirebaseService, public toastservice: ToastService){}
  public id:string='';
  public transfert:any={}
  action='';
  public get title() : string {
    return `${this.transfert?.inZone?.country.name} --> ${this.transfert?.outZone?.country?.name}` || this.transfert?.id
   }
  public get ownerProps() : any[] {
    return Object.entries(this.transfert?.owner|| {});
  }
  public  buildProps(prop:string) : any[] {
    try {
      return Object.entries(this.transfert[prop]|| {});
    } catch (error) {
      return [];
    }

  }
  get statesopts():any[] {return REQUEST_STATES}
  public get transfProps() : any[] {
    return Object.entries({...this.transfert,owner:'',bank:'',inZone:'',outZone:'',receiver:'',deposit:''
    ,createdDate: (this.transfert?.createdDate)? JSON.stringify(this.transfert?.createdDate): null

  }|| {});
  }
  get isUpdatable(): boolean {
    return !this.isDeleted && this.transfert?.status != 'WORKING_STATE';
  }
  get isDeleted(): boolean {
    return this.transfert?.status == 'DELETED';
  }
  get isEdit(){
    return this.action == 'EDIT';
  }
  get isChange(){
    return this.action == 'CHANGE';
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    this.routes.paramMap
    .pipe(map(params => params.get('id')), tap(id => (this.id = id || '')))
    .subscribe(id => {
      this.getTransfert()
    });
  }
  public getTransfert(){
    this.transfert= this.firebase.transferts.find(x=>x.id==this.id);

    const data=transfert.buildGetInfo(this.id)
    this.firebase.callFunction(TRANSFERT_FUNCTION,data).then(
      (_data:any)=>{
        console.log(_data);

        if(_data?.body)
          this.transfert= _data?.body
          else
          this.transfert={}
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
    this.getTransfert()
  }
  goto(pathname:string){
    this._router.navigateByUrl(pathname)
  }
  public deleteRequest(){
    const data=transfert.buildDeleteRequest(this.id)


    this.firebase.callFunction(TRANSFERT_FUNCTION,data).then(
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
      this.goto('/transfert')

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

  transfertFields: any[] = [
    {
      label: 'Amount',
      name: 'amount',
      type: stypes.number,
      xs: '6',
      sm: '6',
      md: '6',
      lg: '6',
      xl: '6',
    },
    {
      label: 'Status',
      name: 'status',
      type: stypes.text,
      xs: '6',
      sm: '6',
      md: '6',
      lg: '6',
      xl: '6',
    },
    {
      label: 'Description',
      name: 'description',
      type: stypes.text,
      xs: '12',
      sm: '12',
      md: '12',
      lg: '12',
      xl: '12',
    },
  ];
  zoneFields: any[] = [
    {
      label: 'Name',
      name: 'name',
      type: stypes.text,
      xs: '6',
      sm: '6',
      md: '6',
      lg: '6',
      xl: '6',
    },
    {
      label: 'Code',
      name: 'code',
      type: stypes.text,
      xs: '6',
      sm: '6',
      md: '6',
      lg: '6',
      xl: '6',
    },
    {
      label: 'Country',
      name: 'country.name',
      type: stypes.text,
      xs: '12',
      sm: '12',
      md: '12',
      lg: '12',
      xl: '12',
    },
  ];
  userFields: any[] = [
    {
      label: 'First Name',
      name: 'firstname',
      type: stypes.text,
      xs: '6',
      sm: '6',
      md: '6',
      lg: '6',
      xl: '6',
    },
    {
      label: 'Last Name',
      name: 'lastname',
      type: stypes.text,
      xs: '6',
      sm: '6',
      md: '6',
      lg: '6',
      xl: '6',
    },
    {
      label: 'Email',
      name: 'email',
      type: stypes.text,
      xs: '12',
      sm: '12',
      md: '12',
      lg: '12',
      xl: '12',
    },
  ];
}
