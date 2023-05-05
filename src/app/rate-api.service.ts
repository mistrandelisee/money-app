import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable,of } from 'rxjs';
import { catchError, find,filter, map, tap } from 'rxjs/operators';
const KEY='oTWfJOVFXGz3dHBVb4hpl8uU8vEbS1Iz';
@Injectable({
  providedIn: 'root'
})
export class RateApiService {


  httpOptions = {
    // headers: new HttpHeaders({ 'apikey': KEY})
  };
  constructor(private http: HttpClient) { }

  private  ALL_COUNTRIES = `https://countriesnow.space/api/v0.1/countries`;
  public getCountries(): Observable<any> {
    const url=this.ALL_COUNTRIES+'/currency';
    return this.http.get<any>(url,this.httpOptions).pipe(
      // map(result=> { return result}),
      // retry(4),
      tap(_ => this.log(`fetched countries`)),
      catchError(this.handleError<any>(`fetched countries`))
    );
  }
  public getCountry(country_name: string): Observable<any> {
    const url=`${this.ALL_COUNTRIES}/currency/q?country=${country_name}`;
    return this.http.get<any>(url,this.httpOptions).pipe(
      // map(result=> { return result}),
      // retry(4),
      tap(_ => this.log(`fetched country name=${country_name}`)),
      catchError(this.handleError<any>( `country name=${country_name}`))
    );
  }

  public getCountryCities(country_name: string): Observable<any> {
    const url=`${this.ALL_COUNTRIES}/cities`;
    const body={
      "country": country_name
  }
    return this.http.post<any>(url,body,this.httpOptions).pipe(
      // map(result=> { return result}),
      // retry(4),
      tap(_ => this.log(`fetched country name=${country_name}`)),
      catchError(this.handleError<any>( `country name=${country_name}`))
    );
  }





 /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
 private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}
private log(message: string) {
  console.log(`MetaService : ${message}`);
}

}
