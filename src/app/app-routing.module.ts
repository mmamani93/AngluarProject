import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
 
import { DeliveryComponent }      from './components/delivery/delivery.component';
import { DeliveryDetailComponent }  from './components/delivery/delivery-detail.component';
 
const routes: Routes = [
  { path: '', redirectTo: '/deliveries', pathMatch: 'full' },
  { path: 'detail/:id', component: DeliveryDetailComponent },
  { path: 'detail', component: DeliveryDetailComponent },
  { path: 'deliveries', component: DeliveryComponent }
];
 
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
