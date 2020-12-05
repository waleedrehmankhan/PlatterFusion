import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventsModule } from './events/events.module';
import { LoginComponent } from './login/login.component';
import { SiteLayoutComponent } from './_layout/site-layout/site-layout.component';

const appRoutes: Routes = [
  //Site routes goes here
  {
    path: '',
    component: SiteLayoutComponent
  },

  // App routes goes here here
  //{
  //  path: '',
  //  component: AppLayoutComponent,
  //  runGuardsAndResolvers: 'always',
  //  canActivate: [AuthGuard],
  //  children: [
  //    { path: 'dashboard', component: HomeComponent },
  //    { path: 'event', component: EventComponent },
  //    { path: 'addevent', component: AddEventComponent },
  //    { path: 'product', component: ProductComponent },
  //  ],
  //},

  //no layout routes
  { path: 'login', component: LoginComponent },
  //{ path: 'not-found', component: NotFoundComponent },

  // otherwise redirect to home
  //{ path: '**', redirectTo: '' },
  //{ path: "", redirectTo: "event", pathMatch: "full" },
  //{
  //  path: '',
  //  loadChildren: () => import('src/app/events/events.module').then(c => c.EventsModule)
    
  //},
  //{ path: 'not-found', component: NotFoundComponent },
  //{ path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
