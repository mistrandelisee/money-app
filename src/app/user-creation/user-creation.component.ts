import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { ToastService } from '../toast.service';
import { user , USER_FUNCTION} from 'src/types/user';
import { country,COUNTRY_FUNCTION } from 'src/types/country';
import { UserRole } from 'src/enum/user-role';

@Component({
  selector: 'app-user-creation',
  templateUrl: './user-creation.component.html',
  styleUrls: ['./user-creation.component.css']
})
export class UserCreationComponent {
  public cities: any[]=[];
  public _user:user=new user();
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
    this.getCountries();


  }
  savelocal(id:string){
    // this._user.id=id
    this.firebase.transferts.push({...this._user,id})
    this.reset()
  }
  public doSave(){

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
