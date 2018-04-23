import { Component, OnInit, Input } from '@angular/core';
import { Delivery } from '../../structures/delivery';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DeliveryService } from '../../services/delivery.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-delivery-detail',
  templateUrl: './delivery-detail.component.html'
})

export class DeliveryDetailComponent implements OnInit {
  @Input() delivery: Delivery;

  isEdit: boolean;

  deliveryForm: FormGroup;
  requiredErrorMessage = "Este campo es obligatorio";
  mailPattern = "[^ @]*@[^ @]*";
  descriptionMaxCharacters = 1000;
  specialitiesMaxCharacters = 500;
  descriptionAvailableCharacters: number;
  specialitiesAvailableCharacters: number;

  constructor(
    private route: ActivatedRoute,
    private deliveryService: DeliveryService,
    private location: Location,
    fb: FormBuilder
  ) {
    this.deliveryForm = fb.group({
      name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      telephone: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      description: new FormControl('', [Validators.required, Validators.maxLength(1000)]),
      specialities: new FormControl('', [Validators.maxLength(500)]),
      address: new FormControl('', [Validators.required, Validators.maxLength(200)]),
      businessHours: new FormControl('', [Validators.required]),
      administrativeContactName: new FormControl('', [Validators.required, Validators.maxLength(200)]),
      administrativeContactLastname: new FormControl('', [Validators.required, Validators.maxLength(200)]),
      administrativeContactTelephone: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      administrativeContactEmail: new FormControl('', [Validators.required, Validators.maxLength(100), Validators.pattern(this.mailPattern)]),
      commercialContactName: new FormControl('', [Validators.required, Validators.maxLength(200)]),
      commercialContactLastname: new FormControl('', [Validators.required, Validators.maxLength(200)]),
      commercialContactTelephone: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      commercialContactEmail: new FormControl('', [Validators.required, Validators.maxLength(100), Validators.pattern(this.mailPattern)])
    })
  }

  ngOnInit(): void {
    this.getDelivery();
  }

  getDelivery(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.deliveryService.getDelivery(id)
        .subscribe(delivery => {
          this.delivery = delivery;
          this.delivery.description ? this.descriptionAvailableCharacters = this.descriptionMaxCharacters - this.delivery.description.length : this.descriptionAvailableCharacters = this.descriptionMaxCharacters;
          this.delivery.specialities ? this.specialitiesAvailableCharacters = this.specialitiesMaxCharacters - this.delivery.specialities.length : this.specialitiesAvailableCharacters = this.specialitiesMaxCharacters;
        });
    } else {
      this.isEdit = false;
      this.descriptionAvailableCharacters = this.descriptionMaxCharacters;
      this.specialitiesAvailableCharacters = this.specialitiesMaxCharacters;
    }
  }

  save(): void {
    this.deliveryService.updateDelivery(this.delivery)
      .subscribe(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }

  descriptionKeyup(text): void {
    this.descriptionAvailableCharacters = this.descriptionMaxCharacters - text.length;
  }

  specialitiesKeyup(text): void {
    this.specialitiesAvailableCharacters = this.specialitiesMaxCharacters - text.length;
  }

}
