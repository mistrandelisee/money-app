import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-v-zone',
  templateUrl: './v-zone.component.html',
  styleUrls: ['./v-zone.component.css']
})
export class VZoneComponent {
  @Input()
  country='';
  @Input()
  city=''
  @Input()
  zoneKey=''
  @Input()
  exCountry='';
  @Input()
  exCity=''
  @Input()
  allCountries:any[]=[]

  get countries():any[]{
    const self=this;
    const _countries:any[] = []
    this.allCountries.forEach(function(country:any)  {
      if (self.exCountry!==country.id) {
        _countries.push( {id:country.id, name:country.name} )
      }
    });
    return _countries ||[]

  }
  get cities():any[]{
    const _country=this.allCountries.find(country => country.id===this.country)
    if (_country) {
      return _country.cities
    }

    return []
  }

  public countryChanged(event: any): void {
    console.log('countryChange:',event);
    this.country=event.value
    this.city=''
    // event.preventDefault();
    this.notify();
  }
  public cityChanged(event:any): void {
    console.log('cityChange');
    this.city=event.value
    console.log(this.city);
    // event.preventDefault();
    this.notify();
  }
  public countryChange(event: any): void {
    console.log('countryChange:',event.target.value);
    this.city=''
    event.preventDefault();
    this.notify();
  }
  public cityChange(event:any): void {
    console.log('cityChange');

    const city_name=event.target.value
    console.log(this.city);
    event.preventDefault();
    this.notify();
  }
  public countrykey:string;
  public citykey:string;
  constructor(){
    this.countrykey='country'+this.zoneKey;
    this.citykey='city'+this.zoneKey;
  }


  @Output() valuechange: EventEmitter<any> = new EventEmitter();
  notify() {
    this.valuechange.emit({country:this.country,city:this.city,zoneKey:this.zoneKey});
  }
}
