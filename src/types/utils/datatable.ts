export class col {
  label?: string;
  fieldName: string='';
  value: string='';
  type: supportedTypes=stypes.text;
  hideLabel?: boolean;
  sortable?: boolean;
  searcheable?: boolean=true;
  attributes?:typeAttributes=new typeAttributes();
  get tojson() { return JSON.stringify(this) }
  get _type() { return <string> this.type}
  get _btnClass():string {
    if (this.attributes?.variant==_variant.brand) return 'slds-button slds-button_brand'
      else if (this.attributes?.variant==_variant.success) return 'slds-button slds-button_success'
        else if (this.attributes?.variant==_variant.destructive) return 'slds-button slds-button_destructive'
          else if (this.attributes?.variant==_variant.neutral) return 'slds-button slds-button_neutral'
            else if (this.attributes?.variant==_variant.textdestructive) return 'slds-button slds-button_text-destructive'
              else if (this.attributes?.variant==_variant.outlinebrand) return 'slds-button slds-button_outline-brand'
                else return 'slds-button'
  }
}

class typeAttributes{
  alternativeText="";
  class="";
  iconClass="";
  iconPosition="";
  iconName="";
  label="";
  name="";
  variant?:_variant;
  title=""
}
enum supportedTypes{
  text="text",
  password="password",
  email="email",
  url="url",
  tel="tel",
  date="date",
  number="number",
  button="button"
}
enum _variant{
  base="base",
  neutral="neutral",
  destructive="destructive",
  outlinebrand="outline-brand",
  textdestructive="text-destructive",
  success="success",
  brand="brand"
}
export const stypes=supportedTypes
export const variant=_variant
