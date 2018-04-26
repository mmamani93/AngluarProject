import { Component, OnInit } from '@angular/core';
import { Delivery } from '../../structures/delivery';
import { DeliveryService } from '../../services/delivery.service';
import { Router } from '@angular/router';
import { GridOption, GridFilter, GridColumn } from '../../structures/gridOption';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['delivery.component.css']
})
export class DeliveryComponent implements OnInit {
  title = "Listado de Deliveries";
  newDeliveryButton = "Crear nuevo delivery";

  deliveries: Delivery[];

  constructor(
    private deliveryService: DeliveryService,
    private router: Router) { }

  ngOnInit() {
    this.getDeliveries();
  }

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

  //GRID CONFIGURATION
  sortFunction(column: any, direction: number): any {
    return function (a, b) {
      if (a[column.name].toLowerCase() < b[column.name].toLowerCase()) {
        return -1 * direction;
      }
      else if (a[column.name].toLowerCase() > b[column.name].toLowerCase()) {
        return 1 * direction;
      }
      else {
        return 0;
      }
    }
  }

  gridOptions: GridOption = {
    filters: [
      new GridFilter("name", "Nombre"),
      new GridFilter("address", "Dirección")],
    columns: [
      new GridColumn("name", "Nombre", true, true, this.sortFunction),
      new GridColumn("address", "Dirección", false, null, null),
      new GridColumn("telephone", "Teléfono", false, null, null)
    ],
    pageSize: 3
  }

}
