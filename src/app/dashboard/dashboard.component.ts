import { Component, OnInit } from '@angular/core';
import { Delivery } from '../delivery';
import { DeliveryService } from '../delivery.service';
 
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  deliveries: Delivery[] = [];
 
  constructor(private deliveryService: DeliveryService) { }
 
  ngOnInit() {
    this.getDeliveries();
  }
 
  getDeliveries(): void {
    this.deliveryService.getDeliveries
    .subscribe(deliveries => this.deliveries = deliveries);
  }
}