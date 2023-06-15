import { Component ,ViewChild,Output,EventEmitter} from '@angular/core';
import { RateApiService } from '../rate-api.service';
import { FirebaseService } from '../firebase.service';
import { stypes } from 'src/types/utils/form-item';
import { VFormComponent } from '../v-form/v-form.component';
import { COUNTRY_FUNCTION, country } from 'src/types/country';
import { ToastService } from '../toast.service';

@Component({
  selector: 'app-country-creation',
  templateUrl: './country-creation.component.html',
  styleUrls: ['./country-creation.component.css']
})
export class CountryCreationComponent {
  @ViewChild('formCountry') formCountryCmp!: VFormComponent;
  public countries: any[]=[];
  public _country:country = new country()
  constructor(public rateapi:RateApiService, public toastservice: ToastService,public firebase:FirebaseService){}
  ngOnInit(): void {
    this.getHelpCountries()
  }
  getHelpCountries():void{
    this.countries=[]
    this.rateapi.getCountries()
    .subscribe(arg =>{
      console.log('-------countriessss');

      console.log(arg );
      this.countries=arg.data
      this.buildForm();
    });
  }
  get hasFields(){
    return this.vfields?.length>0;
  }
  vfields: any[] = []
  buildForm(){
    this.vfields = [
      { label: 'Country Name', name: 'name',
        value: this._country?.name, type: stypes.datalist,
        required: true, placeholder: 'type…',
        xs: '12', sm: '12', md: '12', lg: '12', xl: '12',
        options:this.countries,
        listName: 'countries',
        optionsconfig:{
          label:'iso3',
          value:'name'
        }
        // maxlength: 100, minlength: 10,
        // disabled: false,
        // readonly: false,
      }
    ];
  }
  SaveCountry(){
    this.saveForm()
  }
  saveForm(){
    // const _result:result= Object.assign(new result(false,{}), {...this.formCountryCmp?.save()});
    const {isvalid,body}=this.formCountryCmp?.save()
    if(isvalid){
      const __country={...body}
      const _country=this.countries.find(x=> x.name === __country.name)||{}
      // console.log(country);
      this._country=Object.assign(new country(), _country);

      console.log(this._country);

      const data=this._country.buildSaveRequest(this._country.iso3);
      this.save(data);
    }
    // return isvalid && this.checkCountry();

  }
  save(data:any){
    this.firebase.callFunction(COUNTRY_FUNCTION,data).then(
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
      this.doClose()
    })
  }
  showSuccessToast(title:string,body:string){
    this.toastservice.open('success',title,body)

  }
  @Output() close: EventEmitter<any> = new EventEmitter();
  public doClose(){
    this.close.emit(null);
  }
}
