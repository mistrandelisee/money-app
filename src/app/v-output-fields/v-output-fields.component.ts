import { Component,Input } from '@angular/core';
import { Oitem,stypes} from 'src/types/utils/form-item';

@Component({
  selector: 'app-v-output-fields',
  templateUrl: './v-output-fields.component.html',
  styleUrls: ['./v-output-fields.component.css']
})
export class VOutputFieldsComponent {
  get items():Oitem[]{
    const self = this;
    return this.vfields?.map(function(field){
                                const o=Object.assign(new Oitem(), field);
                                o.value=self.getValue(self.record,field.name);
                                return o;
                              }) || []
  }
  getValue(obj:any,field:string):any{
    // console.log('field');
    // console.log(field);
    // console.log('obj');
    // console.log(obj);

    if (!field || !obj) return ''
    if(!!field && field.includes('.')) {
      obj=obj[field.split('.')[0]];
      field=field.substring( field.indexOf('.')+1)
      return this.getValue(obj, field)
    }
    else return obj[field]
  }
  trackItem(index: number, item: Oitem) {
    return item.name;
  }
  @Input()record: any = {}
  @Input()vfields: any[] = [
    {
      label: 'label',
      name: 'elt1',
      value: '',
      type: stypes.email,
      required: true,
      placeholder: 'label',
      maxlength: 100,
      minlength: 10,
      disabled: false,
      readonly: false,
      xs: '3',
      sm: '3',
      md: '8',
      lg: '3',
      xl: '3',
    },
    {
      label: 'label',
      name: 'elt2.in',
      value: '',
      type: stypes.number,
      required: true,
      placeholder: 'label',
      maxlength: 100,
      minlength: 10,
      disabled: false,
      readonly: false,
      xs: '3',
      sm: '3',
      md: '10',
      lg: '3',
      xl: '3',
    },
  ];
}
