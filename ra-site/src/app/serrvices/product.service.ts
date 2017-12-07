import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { Product } from '../model/product';
import { PRODUCTS } from '../model/mock-products';

@Injectable()
export class ProductService {

  private serviceUrl = "http://localhost:5000/api/product";
  private retVal: Observable<Product[]>;

  constructor(private http: HttpClient) {

   }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.serviceUrl)
    .pipe(
      catchError(this.handleError('getProducts', []))
    );
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(this.serviceUrl + "/${id}")
    .pipe(
      catchError(this.handleError<Product>(`getProduct id=${id}`))
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
