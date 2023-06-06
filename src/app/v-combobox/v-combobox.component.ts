import { Component, EventEmitter, Input, Output, ɵAPP_ID_RANDOM_PROVIDER } from '@angular/core';

@Component({
  selector: 'app-v-combobox',
  templateUrl: './v-combobox.component.html',
  styleUrls: ['./v-combobox.component.css']
})
export class VComboboxComponent {
  @Output() valuechange: EventEmitter<any> = new EventEmitter();
  @Input()
  vlabel='Selected label';
  @Input()
  vvalue='';
  @Input() vlabelkey='label'
  @Input() vvaluekey='value'
  @Input()
  voptions=[
    {label:'Option 1', value:'1'},
    {label:'Option 2', value:'2'},
    {label:'Option 3', value:'3'},
    {label:'Option 4', value:'4'},
    {label:'Option 5', value:'5'},
    {label:'Option 1', value:'1'},
    {label:'Option 2', value:'2'},
    {label:'Option 3', value:'3'},
    {label:'Option 4', value:'4'},
    {label:'Option 5', value:'5'},
    {label:'Option 1', value:'1'},
    {label:'Option 2', value:'2'},
    {label:'Option 3', value:'3'},
    {label:'Option 4', value:'4'},
    {label:'Option 5', value:'5'},
  ];
  vclass=''
  timer:any;
  get ckey(){
    return Math.random()
  }
  get _voptions(){
    const klabel = this.vlabelkey;
    const kvalue = this.vvaluekey;
    return this.voptions.map(function(option:any){
      return {label:option[klabel], value:option[kvalue],...option};
    });
  }
  get selectedOption(){
    return this._voptions?.find(v => v.value==this.vvalue)?.label
  }
  public dofocus(): void {
    this.vclass='slds-is-open';
  }
  public dofocusout(): void {
    console.log('dofocusout');
    this.timer=setTimeout(() => {
      this.vclass='';
    }, 3000);
  }
  doclick(opt:any): void {
    console.log(opt);
    this.notify(opt)
    this.vclass='';
    this.vvalue=opt.value
    if (this.timer) {
      clearTimeout(this.timer)
    }
  }
  notify(opt:any) {
    this.valuechange.emit({...opt});
  }
}
