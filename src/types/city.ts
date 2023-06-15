import { baseRequest } from "./baseRequest"
export  const CITY_FUNCTION ='nl_manage_city'
const GET_ALL = "GET-ALL";
const SAVE = "SAVE";
export class city{
    name= '';
    country_id='';
    code= ''

    public buildSaveRequest(id:string): any{
        const req=new baseRequest();
        req.action=SAVE;
        return {...req,country: {...this,id}}
    }
    public static buildGetAllCitiesRequest(): any{
        const req=new baseRequest();
        req.action=GET_ALL;
        return {...req}
    }
}
