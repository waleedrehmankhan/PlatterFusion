import { OrderViewComponent } from './order-view/order-view.component';
import { OrderAddComponent } from './order-add/order-add.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: "view", component: OrderViewComponent },
  { path: "add", component: OrderAddComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
