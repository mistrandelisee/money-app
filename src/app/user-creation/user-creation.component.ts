import { Component, EventEmitter, Input, Output,ViewChild } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { ToastService } from '../toast.service';
import { user , USER_FUNCTION} from 'src/types/user';
import { country,COUNTRY_FUNCTION } from 'src/types/country';
import { UserRole } from 'src/enum/user-role';
import { stypes } from 'src/types/utils/form-item';
import { VFormComponent, result } from '../v-form/v-form.component';

@Component({
  selector: 'app-user-creation',
  templateUrl: './user-creation.component.html',
  styleUrls: ['./user-creation.component.css']
})
export class UserCreationComponent {
  public cities: any[]=[];
  public _user:user=new user();
  @ViewChild('formUser') formUserCmp!: VFormComponent;
  countries: any[]=[];
  @Input()
  user:any={}
  @Input()
  userId=''
  @Input()
  vrole=''
  @Input()
  isEdit=false;
  public reset(){
    this._user==new user();
  }

  constructor(public firebase:FirebaseService, public toastservice: ToastService){

    console.log('constructor')
    if (this.userId) {
      this._user.init( this.user);
    }
  }
  buildFromRequest(user:any){

  }
  ngOnInit(): void {
    console.log('ngOnInit')
    this.reset()
    if (this.userId) {
      this._user.init( this.user);
    }else{
      this._user.role=<UserRole>this.vrole
      this._user.firstname=(<string>this._user.role)?.toLocaleLowerCase()
      this._user.email=(<string>this._user.role)?.toLocaleLowerCase()+'00@mail.com'
    }
    // this.countries=this.initCities()||[]
    this.buildForm()
    this.getCountries();


  }
  savelocal(id:string){
    // this._user.id=id
    this.firebase.transferts.push({...this._user,id})
    this.reset()
  }
  saveForm(){
    // const _result:result= Object.assign(new result(false,{}), {...this.formUserCmp?.save()});
    const {isvalid,body}=this.formUserCmp?.save()
    if(isvalid){
      const _user={...this._user,...body}

      console.log(_user);
      this._user=Object.assign(new user(), _user);

      console.log(this._user);

    }
    return isvalid && this.checkCountry();

  }
  checkCountry(){
    return this._user.country && this._user.city
  }
  public doSave(){
    const proceed=this.saveForm()
    if(proceed){
      this._doSave()
    }
  }
  public _doSave(){

    const data=(this.isEdit) ?this._user.buildUpdateRequest(this.userId) :this._user.buildAdminCreateRequest()
    console.log(data);
    let id=new Date().getTime()+'';

    // return ;

    ///*
    this.firebase.callFunction(USER_FUNCTION,data).then(
      (_data:any)=>{
        console.log(_data);
        this.showSuccessToast('Success',_data?.message )
      }
    )
    .catch(err=>{
      //console.error(err);
      //this.showErrorToast(err?.body, err?.message)
    })
    .finally(() => {
      this.savelocal(id);

    })
    //*/

  }
  getCountries() {
    const data=country.buildGetCountriesRequest()
    this.firebase.callFunction(COUNTRY_FUNCTION,data).then(
      (_data:any)=>{
        console.log('countries');
        console.log(_data);
        this.countries=_data?.body;
      }
    )
    .catch((err:any)=>{
      //console.error(err);
    })
}

  public zoneChanged(event:any):void{
    console.log(event)
    if (event) {
      const {country,city}=event;
      this._user.country=country;
      this._user.city=city;
    }
  }
  initCities(){
    return [
      {
        id: '0111111',
        name: 'Paris',
        code: 'Paris-FRA',
        country:{
          id: 'EUR',
          currency: 'EUR',
          name: 'France',
        }
      },
      {
        id: '0111112',
        name: 'Marseille',
        code: 'Marseille-FRA',
        country:{
          id: 'EUR',
          currency: 'EUR',
          name: 'France',
        }
      },
      {
        id: '0111113',
        name: 'Douala',
        code: 'Douala-CMR',
        country:{
          id: 'XAF',
          currency: 'XAF',
          name: 'Cameroon',
        }
      },
      {
        id: '011114',
        name: 'Yaounde',
        code: 'Yaounde-CMR',
        country:{
          id: 'XAF',
          currency: 'XAF',
          name: 'Cameroon',
        }
      },

      {
        id: '011115',
        name: 'California',
        code: 'California-USD',
        country:{
          id: 'USD',
          currency: 'USD',
          name: 'Unites States',
        }
      },


    ]
  }
  vfields: any[] = []
  buildForm(){
    this.vfields = [
      { label: 'First name', name: 'firstname',
        value: this._user?.firstname, type: stypes.text,
        required: true, placeholder: 'type…',
        xs: '3', sm: '3', md: '8', lg: '3', xl: '3',
        // maxlength: 100, minlength: 10,
        // disabled: false,
        // readonly: false,
      },
      { label: 'Last name', name: 'lastname',
        value: this._user?.lastname, type: stypes.text,
        required: true, placeholder: 'type…',
        xs: '3', sm: '3', md: '8', lg: '3', xl: '3',
      },
      { label: 'Email', name: 'email',
        value: this._user?.email, type: stypes.email,
        required: true, placeholder: 'type…',
        xs: '3', sm: '3', md: '8', lg: '3', xl: '3',
      },
      { label: 'Phone', name: 'phone',
        value: this._user?.phone, type: stypes.tel,
        required: true, placeholder: 'type…',
        xs: '3', sm: '3', md: '8', lg: '3', xl: '3',
      },
    ];
  }
  showErrorToast(title:string,body:string){
    this.toastservice.open('error',title,body)

  }
  showSuccessToast(title:string,body:string){
    this.toastservice.open('success',title,body)

  }
  showWarningToast(title:string,body:string){
    this.toastservice.open('warning',title,body)
  }
  @Output() back: EventEmitter<any> = new EventEmitter();
  goBack() {
    this.back.emit();
  }
}
