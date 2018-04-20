import { Injectable } from '@angular/core';

import { Delivery } from './delivery';
import { DELIVERIES } from './mock-deliveries';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';


@Injectable()
export class DeliveryService {

  constructor() { }

  getDeliveries(): Observable<Delivery[]> {
    return of(DELIVERIES);
  }

}
