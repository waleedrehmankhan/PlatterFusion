import { NgModule } from '@angular/core';
import { EventComponent } from './event-list/event.component';
import { AddEventComponent } from './add-event/add-event.component';
import { EventsRoutingModule } from './events.routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    EventComponent,
    AddEventComponent
  ],
  imports: [
    EventsRoutingModule,
    FormsModule,
    CommonModule
  ]
})
export class EventsModule { }
