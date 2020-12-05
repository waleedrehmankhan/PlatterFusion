import { EventComponent } from "./event-list/event.component";
import { AddEventComponent } from "./add-event/add-event.component";
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from '../_guards/auth.guard';
import { NotFoundComponent } from '../not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'event',
        component: EventComponent,
        data: {
          title: 'events'
        }
      },
      {
        path: 'addevent',
        component: AddEventComponent,
        data: {
          title: 'Add new events',
        }
      },
      { path: '**', redirectTo: '/not-found' },
      { path: 'not-found', component: NotFoundComponent, data: { title: 'Path not found' }, pathMatch: 'full'}
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class EventsRoutingModule { }
