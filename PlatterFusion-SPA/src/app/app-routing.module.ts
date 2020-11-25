import { AddEventComponent } from './add-event/add-event.component';
import { HomeComponent } from './home/home.component';
import { EventComponent } from './event/event.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'event', component: EventComponent},
  {path: 'addevent', component: AddEventComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
