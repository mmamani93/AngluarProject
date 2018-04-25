import { Component, OnInit } from '@angular/core';
import { Delivery } from '../../structures/delivery';
import { DeliveryService } from '../../services/delivery.service';
import { DeliverynSearchPipe } from './deliveryFilter.pipe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html'
})
export class DeliveryComponent implements OnInit {
  title = "Listado de Deliveries";
  newDeliveryButton = "Crear nuevo delivery";

  deliveries: Delivery[];

  gridOptions = {
    filters: [
      { name: "name", text: "Nombre", value: "" },
      { name: "address", text: "Dirección", value: "" }
    ],
    columns: [
      { name: "name", text: "Nombre", sortable: true, sortDescending: true },
      { name: "address", text: "Dirección", sortable: false },
      { name: "telephone", text: "Teléfono", sortable: false }
    ],
    pageSize: 3,
  }

  constructor(
    private deliveryService: DeliveryService,
    private router: Router) { }

  getDeliveries(): void {
    this.deliveryService.getDeliveries()
      .subscribe(deliveries => {
        this.deliveries = deliveries;
      });
  }

  delete(delivery: Delivery): void {
    this.deliveries = this.deliveries.filter(h => h !== delivery);
    this.deliveryService.deleteDelivery(delivery).subscribe();
  }

  edit(delivery: Delivery): void {
    this.router.navigateByUrl('/detail/' + delivery.id);
  }

  ngOnInit() {
    this.getDeliveries();
  }

}
