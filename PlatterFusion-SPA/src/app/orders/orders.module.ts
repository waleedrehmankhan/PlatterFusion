import { SharedModule } from './../_module/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrderViewComponent } from './order-view/order-view.component';
import { OrderMenuComponent } from './order-menu/order-menu.component';
import { OrderOnlineComponent } from './order-online/order-online.component';
import { FormsModule } from '@angular/forms';
import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { BsDatepickerModule, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { NgxErrorsModule } from '@ultimate/ngxerrors';
import { NgxMaskModule } from 'ngx-mask';
import { AgmCoreModule } from '@agm/core';
import { NgxStripeModule } from 'ngx-stripe';

@NgModule({
  declarations: [OrderViewComponent, OrderMenuComponent, OrderOnlineComponent ],
  imports: [
    CommonModule,
    FormsModule,
    ModalModule,
    OrdersRoutingModule,
    SharedModule,
    NgxStripeModule.forRoot('pk_test_8Bhg2MXmjmk1HHeY8cCk2qHm'),
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
    NgxErrorsModule,
    NgxMaskModule.forRoot({
      showMaskTyped: true,
    }),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyA0hki1fpuWlQr4KnOItmUS - t43S7z46wk',
      libraries: ["places"],
    })
  ],
  providers: [BsModalService, BsLocaleService],
})
export class OrdersModule { }
