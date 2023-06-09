import { baseRequest } from "./baseRequest"
export  const COUNTRY_FUNCTION ='nl_manage_country'
const GET_COUNTRY = "GET-ALL-WITH-CITIES";
export class country{



    public static buildGetCountriesRequest(): any{
        const req=new baseRequest();
        req.action=GET_COUNTRY;
        return {...req}
    }
}
