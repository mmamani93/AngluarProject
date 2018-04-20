import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject }    from 'rxjs/Subject';
import { of }         from 'rxjs/observable/of';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { Delivery } from '../../structures/delivery';
import { DeliveryService } from '../../services/delivery.service';

@Component({
  selector: 'app-delivery-search',
  templateUrl: './delivery-search.component.html'
})
export class DeliverySearchComponent implements OnInit {
  deliveries$: Observable<Delivery[]>;
  private searchTerms = new Subject<string>();

  constructor(private deliveryService: DeliveryService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.deliveries$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.deliveryService.searchDeliveries(term)),
    );
  }
  
}
