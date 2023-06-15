import { baseRequest } from "./baseRequest"
export  const COUNTRY_FUNCTION ='nl_manage_country'
const GET_COUNTRY = "GET-ALL-WITH-CITIES";
const GET_ALL = "GET-ALL";
const SAVE = "SAVE";
export class country{
    name= '';
    currency='';
    iso2= '';
    iso3= ''
    code= ''

    public buildSaveRequest(id:string): any{
        const req=new baseRequest();
        req.action=SAVE;
        this.code=this.iso3;
        return {...req,country: {...this,id}}
    }
    public static buildGetAllCountriesRequest(): any{
        const req=new baseRequest();
        req.action=GET_ALL;
        return {...req}
    }
    public static buildGetCountriesRequest(): any{
        const req=new baseRequest();
        req.action=GET_COUNTRY;
        return {...req}
    }
}
