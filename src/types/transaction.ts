import { baseRequest } from "./baseRequest"
export  const TRANSACTION_FUNCTION ='nl_manage_transactions'
const SAVE = "SAVE";
const UPDATE = "UPDATE";
const DELETE = "DELETE";
const OPEN = "OPEN";
const GETINFO = "GET-INFO";
const GETALL = "GET-ALL";
export class transaction {
    amount: number=0;
    outZoneCity:string=''
    inZoneCity:string=''
    status:string=OPEN
    createdDate: string='';
    to_bank= true;
    bank:Bank=new Bank() ;
    receiver:Receiver=new Receiver() ;
    deposit:Deposit=new Deposit() ;
    description="test"
    public buildSaveRequest(): any{
        const req=new baseRequest();
        req.action=SAVE;
        this.createdDate=new Date().toJSON();
        return {...req,transaction: {...this}}
    }
    public buildUpdateRequest(id:string): any{
      const req=new baseRequest();
      req.action=UPDATE;
      return {...req,transactionId:id, transaction: {...this}}
    }
    public static buildDeleteRequest(id:string): any{
      const req=new baseRequest();
      req.action=DELETE;
      return {...req,transactionId:id,}
    }
    public static buildGetRequests(): any{
      const req=new baseRequest();
      req.action=GETALL;
      return {...req}
    }
    public static buildGetInfo(transactionId:string){
      const req=new baseRequest();
        req.action=GETINFO;
        return {...req,transaction:{id:transactionId} }
    }
    public  init(request:any):void{
      this.amount=request.amount;
      this.outZoneCity=request?.outZone?.id;
      this.inZoneCity=request?.inZone?.id;
      this.status=request.status;
      try {
        this.createdDate=new Date(request.createdDate) .toJSON();
      } catch (error) {
        console.warn(error);

      }

      this.to_bank=request.to_bank;
      this.bank=request.bank;
      this.receiver=request.receiver;
      this.deposit=request.deposit;
      this.description=request.description;

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
