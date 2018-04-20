import { Component, OnInit, Input } from '@angular/core';
import { Delivery } from '../delivery';

@Component({
  selector: 'app-delivery-detail',
  templateUrl: './delivery-detail.component.html',
  styleUrls: ['./delivery-detail.component.css']
})

export class DeliveryDetailComponent implements OnInit {
  @Input() delivery: Delivery;

  constructor() { }

  ngOnInit() {
  }

}
