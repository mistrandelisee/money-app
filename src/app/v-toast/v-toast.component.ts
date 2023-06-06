import { Component,Input } from '@angular/core';
import { ToastService } from '../toast.service';

@Component({
  selector: 'app-v-toast',
  templateUrl: './v-toast.component.html',
  styleUrls: ['./v-toast.component.css']
})
export class VToastComponent {
  @Input()
  variant='';
  @Input()
  title='';
  @Input()
  body='';
  constructor(public toastservice: ToastService){

  }
  get vClass(): string {
    return (this.variant=='error') ? 'slds-theme_error' : (this.variant=='warning') ? 'slds-theme_warning' : 'slds-theme_success' ;
  }
  get vIcon(): string {
    return (this.variant=='error') ? '/assets/icons/utility-sprite/svg/symbols.svg#error' : (this.variant=='warning') ? '/assets/icons/utility-sprite/svg/symbols.svg#warning' : '/assets/icons/utility-sprite/svg/symbols.svg#success' ;
  }
  get vIconText(): string {
    return (this.variant=='error') ? 'error' : (this.variant=='warning') ? 'warning' : 'success' ;
  }
  get vIconClass(): string {
    return (this.variant=='error') ? 'slds-icon-utility-error' : (this.variant=='warning') ? 'slds-icon-utility-warning' : 'slds-icon-utility-success' ;
  }
  public close(): void {
    this.toastservice.close()
  }
}
