import { Component,OnInit } from '@angular/core';
import { RateApiService } from '../rate-api.service';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-admin-city',
  templateUrl: './admin-city.component.html',
  styleUrls: ['./admin-city.component.css']
})
export class AdminCityComponent implements OnInit {
  public countries: any[]=[];
  public incountries: any[]=[];
  public cities: any[]=[];
  public _country:any ={
    iso3:'',
    name:'',

  }
  public _city:any={
    "name":"",
    "code":"",
    "country_id":"",
    "country":{
      "nom":"",
      "code":"",
      "currency":""
    }
  }
  constructor(public rateapi:RateApiService,public firebase:FirebaseService){

  }

  ngOnInit(): void {
    this.countries=[]
    this.getIncountries();
    this.rateapi.getCountries()
      .subscribe(arg =>{
        console.log(arg );
        this.countries=arg.data
      });


  }
  getIncountries() {
      const data={
          "action":"GET"
        }
      this.firebase.callFunction('manage_country',data).then(
        (resp:any)=>{
          console.log(resp);
          this.incountries=resp.data?.body;
        }
      )
      .catch(err=>{
        console.error(err);
      })
  }
  public SaveCountry(){
      console.log(this._country);
      const data={
          "action":"SAVE",
          "country":{
            ...this._country,
            "id":this._country.iso3,
            "code":this._country.iso3
          }
        }
      this.firebase.callFunction('manage_country',data).then(
        data=>{
          console.log(data);
          this.getIncountries();

          this._country={};
        }
      )
      .catch(err=>{
        console.error(err);
      })


  }
  public SaveCity(){
    console.log(this._city);
    this._city.country_id=this._city.country.id;
    this._city.code=this._city.name+'-'+this._city.country.code;

    const data={
      "action":"SAVE",
      "city":{
        ...this._city,
        "id":this._city.code,
      }
    }
    this.firebase.callFunction('manage_city',data).then(
      data=>{
        console.log(data);
        this._city={};
      }
    )
    .catch(err=>{
      console.error(err);
    })
  }
  public changeSearch(event:any){
    console.log(`event`, event.target.value);
    this._country=this.countries.find(x=> x.name === event.target.value)||{}

  }
  public countryChange(event:any):void {
    const country_name=event.target.value
    this._city.country=this.incountries.find(x=> x.name === country_name)||{}
    this.rateapi.getCountryCities(country_name)
      .subscribe(arg =>{
        console.log(arg );
        this.cities=arg?.data
      });
  }
}
