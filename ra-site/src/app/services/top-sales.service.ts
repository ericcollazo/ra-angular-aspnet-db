import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { ConfigService } from '../services/config.service';

import { TopSales } from '../model/top-sales';

@Injectable()
export class TopSalesService {

  private serviceUrl: string;
  
  constructor(private http: HttpClient, private configService: ConfigService) {
    this.serviceUrl = this.configService.config.apiUrl;
  }  

  getTopSales(): Observable<TopSales[]> {
    return this.http.get<TopSales[]>(this.serviceUrl+`/topsales/4`)
    .pipe(
      catchError(this.handleError('getTopSales', []))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
   
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
   
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
