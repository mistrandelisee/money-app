import { Component,Input,Output,EventEmitter } from '@angular/core';
const timeout=1000
@Component({
  selector: 'app-v-search',
  templateUrl: './v-search.component.html',
  styleUrls: ['./v-search.component.css']
})
export class VSearchComponent {
  @Input()
  isLoading:boolean = false;
  @Input()
  title:string = '';
  @Input()
  placeholder:string = '';
  @Input()
  timeout:string = '3000';//3s
  get showLabel(){
    return !! this.title;
  }

  timer:any;
  @Input()
  value:string='';
  public onTyped(event:any){

    const value=event.target.value;
    console.log('change>>>>>>>>>> ', value);
    console.log('change>>>>>>>>>> ', value);
    (this.timer)? clearTimeout(this.timer):'';
    this.timer=setTimeout(() => {
      this.sendInfo(value)
    }, (+this.timeout|| timeout));


  }
  Clear(){
    this.value='';
    this.sendInfo('');
  }

  @Output() search: EventEmitter<any> = new EventEmitter();
  sendInfo(value:any) {
    console.log('sendInfo>>>>>>>>>> ', value);
    console.log('sendInfo>>>>>this.value>>>>> ', this.value);
    this.isLoading=true
    this.search.emit({value});
  }
}
