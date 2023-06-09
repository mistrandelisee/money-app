import { Component } from '@angular/core';
import { Iitem, stypes } from 'src/types/utils/form-item';

@Component({
  selector: 'app-v-form',
  templateUrl: './v-form.component.html',
  styleUrls: ['./v-form.component.css'],
})
export class VFormComponent {
  get items():Iitem[]{
    return this.vfields?.map(field =>Object.assign(new Iitem(), field)) || []
  }
  vfields: any[] = [
    {
      label: 'label',
      name: 'elt1',
      value: '',
      type: stypes.text,
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
      name: 'elt1',
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
