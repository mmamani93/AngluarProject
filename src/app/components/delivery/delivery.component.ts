import { Component, OnInit } from '@angular/core';
import { Delivery } from '../../structures/delivery';
import { DeliveryService } from '../../services/delivery.service';
import { DeliverynSearchPipe } from './deliveryFilter.pipe';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html'
})
export class DeliveryComponent implements OnInit {
  title = "Listado de Deliveries";
  newDeliveryButton = "Crear nuevo delivery";

  deliveries: Delivery[];

  constructor(private deliveryService: DeliveryService) { 
  }

  getDeliveries(): void {
    this.deliveryService.getDeliveries()
      .subscribe(deliveries => this.deliveries = deliveries);
  }

  /*
  add(delivery: Delivery): void {
    //name = name.trim();
    //if (!name) { return; }
    this.deliveryService.addDelivery(delivery)
      .subscribe(delivery => {
        this.deliveries.push(delivery);
      });
  }*/


  delete(delivery: Delivery): void {
    this.deliveries = this.deliveries.filter(h => h !== delivery);
    this.deliveryService.deleteDelivery(delivery).subscribe();
  }


  ngOnInit() {
    this.getDeliveries();
  }

}
