import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './services/in-memory-data.service';
import { HttpClientModule }    from '@angular/common/http';
import { Pipe, PipeTransform } from '@angular/core';


import { AppComponent } from './app.component';
import { DeliveryComponent } from './components/delivery/delivery.component';
import { DeliveryDetailComponent } from './components/delivery/delivery-detail.component';
import { DeliveryService } from './services/delivery.service';
import { AppRoutingModule } from './app-routing.module';
import { DeliverynSearchPipe } from './components/delivery/deliveryFilter.pipe';


@NgModule({
  declarations: [
    AppComponent,
    DeliveryComponent,
    DeliveryDetailComponent,
    DeliverynSearchPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  providers: [DeliveryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
