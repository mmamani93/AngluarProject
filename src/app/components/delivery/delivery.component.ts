import { Component, OnInit } from '@angular/core';
import { Delivery } from '../../structures/delivery';
import { DeliveryService } from '../../services/delivery.service';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html'
})
export class DeliveryComponent implements OnInit {
  title = "Listado de Deliveries";
  deliveries: Delivery[];

  constructor(private deliveryService: DeliveryService) { }

  getDeliveries(): void {
    this.deliveryService.getDeliveries()
      .subscribe(deliveries => this.deliveries = deliveries);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.deliveryService.addDelivery({ name } as Delivery)
      .subscribe(delivery => {
        this.deliveries.push(delivery);
      });
  }

  delete(delivery: Delivery): void {
    this.deliveries = this.deliveries.filter(h => h !== delivery);
    this.deliveryService.deleteDelivery(delivery).subscribe();
  }


  ngOnInit() {
    this.getDeliveries();
  }

}
