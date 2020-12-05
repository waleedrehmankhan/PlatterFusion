import { EventComponent } from "./event-list/event.component";
import { AddEventComponent } from "./add-event/add-event.component";
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { path: "view", component: EventComponent },
  { path: "add", component: AddEventComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class EventsRoutingModule { }
