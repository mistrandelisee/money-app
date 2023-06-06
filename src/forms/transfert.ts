import { baseRequest } from "./baseRequest"
export  const TRANSFERT_FUNCTION ='nlManageRequest'
const SAVE = "SAVE";
const OPEN = "OPEN";
const GETINFO = "GET-INFO";
export class transfert {
    amount: number=0;
    outZoneCity:string=''
    inZoneCity:string=''
    status:string=OPEN
    createdDate: string=new Date().toJSON();
    to_bank= true;
    bank:Bank=new Bank() ;
    receiver:Receiver=new Receiver() ;
    deposit:Deposit=new Deposit() ;
    description="test"
    public buildSaveRequest(): any{
        const req=new baseRequest();
        req.action=SAVE;
        return {...req,transfert: {...this}}
    }
    public static buildGetInfo(transfertId:string){
      const req=new baseRequest();
        req.action=GETINFO;
        return {...req,transfertId }
    }
}
class Bank{
  number:string='';
  name: string='';
  title: string='';
  typeId:string='';
}
class Receiver{
  fullname:string='';
  numID: string='';
}
class Deposit{
  fullname:string='';
  numID: string='';
}
