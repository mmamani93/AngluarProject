import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const deliveries = [
      { id: 0, name: 'Mauro', description: 'whatever', specialities: 'cook', address: 'haedo', businessHours: '01:00-08:10', telephone:'123',
      administrativeContact: {id:1, name: 'jorge', lastname: 'perez', telephone: '324', email: 'addas@asd.com'},
      commercialContact: {id: 1, idemContact: true, name: 'jose', lastname: 'azul', telephone: '13123', email: 'asad@wtwe.com'}
      },
      { id: 1, name: 'Ramiro', description: 'whatever', specialities: 'cook', address: 'ramos mejia', businessHours: '01:00-08:10', telephone:'123',
      administrativeContact: {id:2, name: 'jorge', lastname: 'perez', telephone: '324', email: 'addas@asd.com'},
      commercialContact: {id: 2, idemContact: true, name: 'jose', lastname: 'azul', telephone: '13123', email: 'asad@wtwe.com'}
      },
      { id: 2, name: 'Mauro2', description: 'whatever', specialities: 'cook', address: 'san justo', businessHours: '01:00-08:10', telephone:'123',
      administrativeContact: {id:3, name: 'jorge', lastname: 'perez', telephone: '324', email: 'addas@asd.com'},
      commercialContact: {id: 3, idemContact: true, name: 'jose', lastname: 'azul', telephone: '13123', email: 'asad@wtwe.com'}
      },
      { id: 3, name: 'Franco', description: 'whatever', specialities: 'cook', address: 'haedo', businessHours: '01:00-08:10', telephone:'123',
      administrativeContact: {id:2, name: 'jorge', lastname: 'perez', telephone: '324', email: 'addas@asd.com'},
      commercialContact: {id: 2, idemContact: true, name: 'jose', lastname: 'azul', telephone: '13123', email: 'asad@wtwe.com'}
      },
      { id: 4, name: 'Analia', description: 'whatever', specialities: 'cook', address: 'Ramos mejia', businessHours: '01:00-08:10', telephone:'123',
      administrativeContact: {id:3, name: 'jorge', lastname: 'perez', telephone: '324', email: 'addas@asd.com'},
      commercialContact: {id: 3, idemContact: true, name: 'jose', lastname: 'azul', telephone: '13123', email: 'asad@wtwe.com'}
      },
    ];
    return {deliveries};
  }
}