import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
 
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
 
import { Delivery } from '../structures/delivery';
 
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
 
@Injectable()
export class DeliveryService {
 
  private deliveriesUrl = 'api/deliveries';  // URL to web api
 
  constructor(
    private http: HttpClient) { }
 
  /** GET deliveries from the server */
  getDeliveries (): Observable<Delivery[]> {
    return this.http.get<Delivery[]>(this.deliveriesUrl)
      .pipe(
        tap(deliveries => this.log(`fetched deliveries`)),
        catchError(this.handleError('getDeliveries', []))
      );
  }
 
  getDeliveryNo404<Data>(id: number): Observable<Delivery> {
    const url = `${this.deliveriesUrl}/?id=${id}`;
    return this.http.get<Delivery[]>(url)
      .pipe(
        map(deliveries => deliveries[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} delivery id=${id}`);
        }),
        catchError(this.handleError<Delivery>(`getDelivery id=${id}`))
      );
  }
 
  getDelivery(id: number): Observable<Delivery> {
    const url = `${this.deliveriesUrl}/${id}`;
    return this.http.get<Delivery>(url).pipe(
      tap(_ => this.log(`fetched delivery id=${id}`)),
      catchError(this.handleError<Delivery>(`getDelivery id=${id}`))
    );
  }
 
  searchDeliveries(term: string): Observable<Delivery[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Delivery[]>(`api/deliveries/?name=${term}`).pipe(
      tap(_ => this.log(`found deliveries matching "${term}"`)),
      catchError(this.handleError<Delivery[]>('searchDeliveries', []))
    );
  }
 
  //////// Save methods //////////
 
  addDelivery (delivery: Delivery): Observable<Delivery> {
    return this.http.post<Delivery>(this.deliveriesUrl, delivery, httpOptions).pipe(
      tap((delivery: Delivery) => this.log(`added delivery w/ id=${delivery.id}`)),
      catchError(this.handleError<Delivery>('addDelivery'))
    );
  }
 
  deleteDelivery (delivery: Delivery | number): Observable<Delivery> {
    const id = typeof delivery === 'number' ? delivery : delivery.id;
    const url = `${this.deliveriesUrl}/${id}`;
 
    return this.http.delete<Delivery>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted delivery id=${id}`)),
      catchError(this.handleError<Delivery>('deleteDelivery'))
    );
  }
 
  updateDelivery (delivery: Delivery): Observable<any> {
    return this.http.put(this.deliveriesUrl, delivery, httpOptions).pipe(
      tap(_ => this.log(`updated delivery id=${delivery.id}`)),
      catchError(this.handleError<any>('updateDelivery'))
    );
  }
 
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
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
    console.log(message);
  }
}