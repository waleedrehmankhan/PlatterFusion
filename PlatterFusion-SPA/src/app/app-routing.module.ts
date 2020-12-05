import { AuthGuard } from './_guards/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventsModule } from './events/events.module';
import { LoginComponent } from './login/login.component';
import { SiteLayoutComponent } from './_layout/site-layout/site-layout.component';
import { AppLayoutComponent } from './_layout/app-layout/app-layout.component';
import { ErrorComponent } from './error/error.component';

const appRoutes: Routes = [
  //no layout routes
  { 
    path: 'login',
    component: LoginComponent 
  },
  //App routes goes here
  {
    path: 'app',
    canActivate: [AuthGuard],
    runGuardsAndResolvers: 'always',
    component: AppLayoutComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      {
        path: "event",
        loadChildren: () =>
          import("./events/events.module").then((m) => m.EventsModule),
        data: { breadcrumb: "Event" },
      },
      {
        path: "product",
        loadChildren: () =>
          import("./product/product.module").then((m) => m.ProductModule),
        data: { breadcrumb: "Product" },
      },
      {
        path: "order",
        loadChildren: () =>
          import("./orders/orders.module").then((m) => m.OrdersModule),
        data: { breadcrumb: "Order" },
      }
    ]
  },
  //App routes goes here
  {
    path: '',
    component: SiteLayoutComponent,
    children: [
    ]
  },
  // Random routes here
  { path: '**', component : ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
