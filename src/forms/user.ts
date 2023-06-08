import { UserStates } from "src/enum/states";
import { baseRequest } from "./baseRequest"
import { UserRole } from "src/enum/user-role";
import { gender } from "src/enum/gender";
export  const USER_FUNCTION ='nl_manage_users'
const CREATE = "CREATE";
const CREATE_SELF = "SAVE";
const UPDATE = "UPDATE";
const DELETE = "DELETE";
const GETALL = "GET-ALL";
const GETINFO = "GET-INFO";
const GETPROFILE = "GET-PROFILE";
const CHANGE_STATUS = "CHANGE-STATUS"
type usersAvailableAction = "SAVE" | "DELETE" | "CHANGE-STATUS" | "CHANGE-STATUS-SELF" | "CREATE" | "UPDATE" | "GET-PROFILE" | "GET-ALL";

export class user {
  /**
   *  "uid": "vMjVtz2u9BZA2dINL2M21oa6OSe2", "email": "client02@test.net", "emailVerified": false, "isAnonymous": false,
   * "providerData": [ { "providerId": "password", "uid": "client02@test.net", "displayName": null, \
   * "email": "client02@test.net", "phoneNumber": null, "photoURL": null
   */
    points: number=0;
    firstname:string=''
    lastname:string='test'
    email:string='test00@mail.com'
    createdDate: string='';
    password:string='password01';
    country: string='';
    city: string='' ;
    phone: string= '+2765895231';
    status?: UserStates=UserStates.CREATED;
    role?: UserRole;
    userId: string='';
    gender?: gender=gender.MALE;
    public buildAdminCreateRequest(): any{
        const req=new baseRequest();
        req.action=CREATE;
        this.createdDate=new Date().toJSON();
        return {...req,user: {...this}}
    }
    public static buildAdminGet(): any{
      const req=new baseRequest();
      req.action=GETALL;
      return {...req}
  }
    public buildUpdateRequest(id:string): any{
      const req=new baseRequest();
      req.action=UPDATE;
      return {...req,userId:id, user: {...this}}
    }
    public static buildDeleteRequest(id:string): any{
      const req=new baseRequest();
      req.action=CHANGE_STATUS;
      return {...req,id}
    }
    public static buildGetInfo(userId:string){
      const req=new baseRequest();
        req.action=GETINFO;
        return {...req,userId }
    }
    public  init(user:any):void{
      this.points=user.points;
      this.city=user.city;
      this.country=user.country;
      this.email=user.email;
      this.firstname=user.firstname;
      this.gender=user.gender;
      this.lastname=user.lastname;
      this.phone=user.phone;
      this.status=user.status;
      this.role=user.role;
      this.userId=user.userId;

      // this.outZoneCity=user?.outZone.id;
      // this.inZoneCity=user?.inZone.id;
      this.status=user.status;
      try {
        this.createdDate=new Date(user.createdDate) .toJSON();
      } catch (error) {
        console.warn(error);

      }

      // this.to_bank=user.to_bank;
      // this.bank=user.bank;
      // this.receiver=user.receiver;
      // this.deposit=user.deposit;
      // this.description=user.description;

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
