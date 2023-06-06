import { Component, EventEmitter, Output } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { country,COUNTRY_FUNCTION } from 'src/forms/country';
import { transfert , TRANSFERT_FUNCTION} from 'src/forms/transfert';
import { ToastService } from '../toast.service';

@Component({
  selector: 'app-transfert-creation',
  templateUrl: './transfert-creation.component.html',
  styleUrls: ['./transfert-creation.component.css']
})
export class TransfertCreationComponent {
  public cities: any[]=[];
  public _transfert:transfert=new transfert();
  countries: any[]=[];
  public reset(){
    this._transfert==new transfert();
  }

  constructor(public firebase:FirebaseService, public toastservice: ToastService){

  }
  ngOnInit(): void {
    this.reset()
    // this.countries=this.initCities()||[]
    this.getCountries();


  }
  savelocal(id:string){
    // this._transfert.id=id
    this.firebase.transferts.push({...this._transfert,id})
    this.reset()
  }
  public SaveTransfert(){

    // this._transfert.currency=this._transfert.inZone.country.currency;
    // this._transfert.inZoneId=this._transfert.inZone.country.id;
    // this._transfert.outZoneId=this._transfert.outZone.country.id;

    // this._transfert.createdDate= new Date().toJSON();
    // this._transfert.LastTimeInPending= new Date().toJSON();
    // console.log(this._transfert);
    // (this._transfert.to_bank)?
    //   this._transfert.receiver=null: this._transfert.bank=null
    const data=this._transfert.buildSaveRequest()
    console.log(data);
    let id=new Date().getTime()+'';

    // return ;


    this.firebase.callFunction(TRANSFERT_FUNCTION,data).then(
      (result:any)=>{
        console.log(result);
        id=result.body;
        // this._transfert={};
        const data:any=result.data;
        if(data?.code=="400"){
          this.showWarningToast(data?.body, data?.message)
        }else this.showSuccessToast('Success',data?.body )
      }
    )
    .catch(err=>{
      console.error(err);
      this.showErrorToast(err?.body, err?.message)
    })
    .finally(() => {
      this.savelocal(id);

    })

  }
  getCountries() {
    const data=country.buildGetCountriesRequest()
    this.firebase.callFunction(COUNTRY_FUNCTION,data).then(
      (resp:any)=>{
        console.log('countries');
        console.log(resp);
        this.countries=resp.data?.body;
      }
    )
    .catch((err:any)=>{
      console.error(err);
    })
}

  public zoneChanged(event:any):void{
    console.log(event)
    if (event?.zoneKey=='in') {
      this._transfert.inZoneCity=event.city
    }
    if (event?.zoneKey=='out') {
      this._transfert.outZoneCity=event.city
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
