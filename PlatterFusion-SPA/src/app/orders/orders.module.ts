import { SharedModule } from './../_module/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrderViewComponent } from './order-view/order-view.component';
import { OrderAddComponent } from './order-add/order-add.component';
import { OrderOnlineComponent } from './order-online/order-online.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [OrderViewComponent, OrderAddComponent, OrderOnlineComponent ],
  imports: [
    CommonModule,
    FormsModule,
    OrdersRoutingModule,
    SharedModule
  ]
})
export class OrdersModule { }
