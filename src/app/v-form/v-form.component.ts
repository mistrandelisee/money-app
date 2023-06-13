import { AfterViewInit, Component, Directive, Input, QueryList, ViewChildren } from '@angular/core';
import { Iitem, stypes } from 'src/types/utils/form-item';
import { VFormItemComponent } from '../v-form-item/v-form-item.component';

@Directive({selector: 'app-v-form-item'})
export class formItem {
  // @Input() id!: string;
}

@Component({
  selector: 'app-v-form',
  templateUrl: './v-form.component.html',
  styleUrls: ['./v-form.component.css']
})
export class VFormComponent implements AfterViewInit {
  @ViewChildren(VFormItemComponent) itemsCmp!: QueryList<VFormItemComponent>;
  get items():Iitem[]{
    return this.vfields?.map(field =>Object.assign(new Iitem(), field)) || []
  }
  trackItem(index: number, item: Iitem) {
    return item.name;
  }
  vfields: any[] = [
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
      name: 'elt2',
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

  ngAfterViewInit() {
    console.log('ngAfterViewInit');

  }
  save() {
    const result:any={isvalid:true}
    this.itemsCmp.forEach(element => {
      const {isvalid, item}=element.save();
      result.isvalid= result.isvalid && isvalid
      result.body= {...result.body,...item}

    });
    console.log(result);
    return result;
  }
  public doSubmit():void{
     this.save();
  }
}
