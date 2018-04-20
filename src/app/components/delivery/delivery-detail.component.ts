import { Component, OnInit, Input } from '@angular/core';
import { Delivery } from '../../structures/delivery';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DeliveryService }  from '../../services/delivery.service';

@Component({
  selector: 'app-delivery-detail',
  templateUrl: './delivery-detail.component.html'
})

export class DeliveryDetailComponent implements OnInit {
  @Input() delivery: Delivery;

  constructor(
    private route: ActivatedRoute,
    private deliveryService: DeliveryService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getDelivery();
  }
  
  getDelivery(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.deliveryService.getDelivery(id)
      .subscribe(delivery => this.delivery = delivery);
  }

  save(): void {
    this.deliveryService.updateDelivery(this.delivery)
      .subscribe(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }

}
