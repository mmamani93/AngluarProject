import { CommercialContact } from './commercialContact';
import { AdministrativeContact } from './administrativeContact';

export class Delivery {
    id: number;
    name: string;
    description: string;
    specialities: string;
    address: string;
    businessHours: string;
    telephone: string;
    commercialContact: CommercialContact;
    administrativeContact: AdministrativeContact;
  }