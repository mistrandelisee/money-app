import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable,of } from 'rxjs';
import { catchError, find,filter, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GcpService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };
  private  CATEGORY_API_URL = `https://us-central1-xmoney-dev.cloudfunctions.net/function-1`;
  constructor(private http: HttpClient) { }
  public testCloudFunction(item_id: string): Observable<any> {
    const url=this.CATEGORY_API_URL;
    return this.http.get<any>(url,this.httpOptions).pipe(
      // map(result=> { return result}),
      // retry(4),
      tap(_ => this.log(`fetched Item testCloudFunction id=${item_id}`)),
      catchError(this.handleError<any>(`Item testCloudFunction id=${item_id}`))
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
