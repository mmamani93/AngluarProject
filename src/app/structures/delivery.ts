import { CommercialContact } from './commercialContact';
import { AdministrativeContact } from './administrativeContact';

export class Delivery {
  id: number;
  name: string;
  description: string;
  specialities: string;
  address: string;
  businessHourStart: string;
  businessHourEnd: string;
  telephone: string;
  commercialContact: CommercialContact;
  administrativeContact: AdministrativeContact;

  constructor() {
    this.administrativeContact = new AdministrativeContact();
    this.commercialContact = new CommercialContact();
    this.businessHourStart = "00.00";
    this.businessHourEnd ="00.00";
  }
}