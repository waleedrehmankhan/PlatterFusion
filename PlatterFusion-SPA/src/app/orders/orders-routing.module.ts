import { OrderViewComponent } from './order-view/order-view.component';
import { OrderMenuComponent } from './order-menu/order-menu.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderOnlineComponent } from './order-online/order-online.component';

const routes: Routes = [
  { path: "view", component: OrderViewComponent },
  { path: "menu", component: OrderMenuComponent },
  { path: "online", component: OrderOnlineComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
