import { AddProductComponent } from './add-product/add-product.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuard } from './_guards/auth.guard';
import { AddEventComponent } from './add-event/add-event.component';
import { HomeComponent } from './home/home.component';
import { EventComponent } from './event/event.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SiteLayoutComponent } from './_layout/site-layout/site-layout.component';
import { AppLayoutComponent } from './_layout/app-layout/app-layout.component';
import { ProductComponent } from './product/product.component';

const routes: Routes = [
  //Site routes goes here
  {
    path: '',
    component: SiteLayoutComponent,
    children: [],
  },

  // App routes goes here here
  {
    path: '',
    component: AppLayoutComponent,
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: HomeComponent },
      { path: 'event', component: EventComponent },
      { path: 'addevent', component: AddEventComponent },
      { path: 'product', component: ProductComponent },
      { path: 'addproduct', component: AddProductComponent}
    ],
  },

  //no layout routes
  { path: 'login', component: LoginComponent },
  { path: 'not-found', component: NotFoundComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}