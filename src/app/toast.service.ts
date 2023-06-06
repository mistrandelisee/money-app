import { Injectable } from '@angular/core';
const DEFAULT_TIMEOUT=5000;
@Injectable({
  providedIn: 'root'
})
export class ToastService {
  isopen: boolean = false;
  variant:string=''
  title:string=''
  body:string=''
  defaultTimeout=DEFAULT_TIMEOUT
  constructor() { }
  public open(variant:string,title:string,body:string,autoclose:boolean=true): void {
    console.log('open ',variant);

    this.variant=variant
    this.title=title
    this.body=body
    this.isopen=true
    if (autoclose) {
          setTimeout(()=>{
            this.close()
          },this.defaultTimeout)
        }
  }
  public close(): void {
    this.isopen=false
  }
}
