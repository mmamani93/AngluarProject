import { Component, OnInit, Input } from '@angular/core';
import { Delivery } from '../../structures/delivery';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DeliveryService } from '../../services/delivery.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AmazingTimePickerModule } from 'amazing-time-picker';

@Component({
  selector: 'app-delivery-detail',
  templateUrl: './delivery-detail.component.html',
  styleUrls: ['delivery.component.css']
})

export class DeliveryDetailComponent implements OnInit {
  @Input() delivery: Delivery;

  isEdit: boolean;

  deliveryForm: FormGroup;
  requiredErrorMessage = "Este campo es obligatorio";
  formatErrorMessage = "Por favor, revise la información ingresada";
  emailRegex = new RegExp('^[^@]+@[^@]+\.[^@]+$');
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
      name: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern("[a-zA-Z\\s-]+")]),
      telephone: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern("[0-9-+s()]*")]),
      description: new FormControl('', [Validators.required, Validators.maxLength(1000)]),
      specialities: new FormControl('', [Validators.maxLength(500)]),
      address: new FormControl('', [Validators.required, Validators.maxLength(200)]),
      businessHourStart: new FormControl('', [Validators.required, Validators.pattern("([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]")]),
      businessHourEnd: new FormControl('', [Validators.required, Validators.pattern("([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]")]),
      administrativeContactName: new FormControl('', [Validators.required, Validators.maxLength(200), Validators.pattern("[a-zA-Z\\s-]+")]),
      administrativeContactLastname: new FormControl('', [Validators.required, Validators.maxLength(200), Validators.pattern("[a-zA-Z\\s-]+")]),
      administrativeContactTelephone: new FormControl('', [Validators.required, Validators.maxLength(100), Validators.pattern("[0-9-+s()]*")]),
      administrativeContactEmail: new FormControl('', [Validators.required, Validators.maxLength(100), Validators.email]),
      commercialContactIdemContact: new FormControl(''),
      commercialContactName: new FormControl('', [Validators.maxLength(200), Validators.pattern("[a-zA-Z\\s-]+")]),
      commercialContactLastname: new FormControl('', [Validators.maxLength(200), Validators.pattern("[a-zA-Z\\s-]+")]),
      commercialContactTelephone: new FormControl('', [Validators.maxLength(100), Validators.pattern("[0-9-+s()]*")]),
      commercialContactEmail: new FormControl('', [Validators.maxLength(100)])
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
      this.delivery = new Delivery();
    }
  }

  save(): void {
    if (this.isEdit) {
      if (confirm("¿Seguro que desea modificar el elemento?"))
        this.deliveryService.updateDelivery(this.delivery)
          .subscribe(() => this.goBack());
    } else {
      this.deliveryService.addDelivery(this.delivery)
        .subscribe(() => this.goBack());
    }
  }

  goBack(): void {
    this.location.back();
  }

  descriptionKeyup(text): void {
    text ? this.descriptionAvailableCharacters = this.descriptionMaxCharacters - text.length : this.descriptionAvailableCharacters = this.descriptionMaxCharacters;
  }

  specialitiesKeyup(text): void {
    text ? this.specialitiesAvailableCharacters = this.specialitiesMaxCharacters - text.length : this.specialitiesAvailableCharacters = this.specialitiesMaxCharacters;
  }

  isValid(fieldName: string, validation: string): boolean {
    let field = this.deliveryForm.get(fieldName);
    if (field.hasError(validation) && (field.touched || field.dirty) == true)
      return false;
    return true;
  }

  checkForIdemContact(fieldName): boolean {
    let field = this.deliveryForm.get(fieldName);
    if (this.delivery && this.delivery.commercialContact.idemContact && !field.value) {
      field.setErrors({ 'required': true });
      return true;
    }
    field.setErrors(null);
    return false;
  }

  validEmail(fieldName): boolean {
    let field = this.deliveryForm.get(fieldName);
    if (this.delivery && this.delivery.commercialContact.idemContact && (field.touched || field.dirty)) {
      if (field.value)
        if (!this.emailRegex.test(field.value)) {
          field.setErrors({ 'invalid email': true });
          return false;
        }
    }
    return true;
  }
}
