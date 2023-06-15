

export class Oitem {
  label?: string;
  name: string='';
  value?: string;
  type: supportedTypes=stypes.text;
  xs?: string;
  sm?: string;
  md?: string;
  lg?: string;
  xl?: string;
  get sclass(){
    return`slds-col lds-size_1-of-1 slds-small-size_${this.xs || 4 }-of-12 slds-medium-size_${this.md || 4 }-of-12 slds-large-size_${this.lg || 4 }-of-12`
  }
  get tojson() { return JSON.stringify(this)}
  get _type() { return <string> this.type}
  // get _isCheckbox() { return  this.type== supportedTypes.checkbox}

  get isBase(){
    return this.type== stypes.email ||
           this.type== stypes.text  ;
  }
  // get isDatalist(){
  //   return this.type== stypes.datalist
  // }
}
export class Iitem extends Oitem{
  required?: boolean;
  placeholder?: string;
  maxlength?: number;
  minlength?: number;
  disabled?: boolean;
  readonly?: boolean;
  errorMessage?:string;
  listName?:string;
  options?:any[];
  optionsconfig?:any={
    label:'label',
    value:'value'
  }

  get isDatalist(){
    return this.type== stypes.datalist
  }
}
 enum supportedTypes{
  text="text",
  password="password",
  email="email",
  url="url",
  tel="tel",
  datalist="datalist",
  number="number",
  // checkbox="checkbox"
}
export const stypes=supportedTypes
