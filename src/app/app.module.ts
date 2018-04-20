import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DeliveryComponent } from './delivery/delivery.component';
import { DeliveryDetailComponent } from './delivery-detail/delivery-detail.component';
import { DeliveryService } from './delivery.service';
import { MessagesComponent } from './messages/messages.component';
import { MessageService } from './message.service';


@NgModule({
  declarations: [
    AppComponent,
    DeliveryComponent,
    DeliveryDetailComponent,
    MessagesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [DeliveryService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
