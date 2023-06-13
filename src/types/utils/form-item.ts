
export class Iitem {
  label?: string;
  name: string='';
  value?: string;
  type: supportedTypes=stypes.text;
  required?: boolean;
  placeholder?: string;
  maxlength?: number;
  minlength?: number;
  disabled?: boolean;
  readonly?: boolean;
  xs?: string;
  sm?: string;
  md?: string;
  lg?: string;
  xl?: string;
  errorMessage?:string;
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
}
 enum supportedTypes{
  text="text",
  password="password",
  email="email",
  url="url",
  tel="tel",
  // custom="custom",
  number="number",
  // checkbox="checkbox"
}
export const stypes=supportedTypes
