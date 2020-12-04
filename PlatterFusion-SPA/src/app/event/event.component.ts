import { EventService } from './../_services/event.service';
import { EventDto } from './../_models/eventDto';
import { EventBindingModel } from './../_models/bindingModels';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css'],
})
export class EventComponent implements OnInit {

  eventArray: EventDto[];
  currentEvent: EventBindingModel =  new EventBindingModel();

  constructor(
    private eventService: EventService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getEvents();
  }

  getEvents() {
    this.eventService.getEvents({ id: 0 })
      .subscribe((response: any) => {
        this.eventArray = response.data.Items;
      });
  }

  editClicked($data) {
    this.eventService.changeMessage($data);
  }

  deleteClicked(data) {
    this.eventService.deleteEvent({ id: data })
      .subscribe((response: any) => {
        this.removeRow(data);
        this.toastr.success(response.message.msg);
      });
  }

  removeRow(id) {
    for (let i = 0; i < this.eventArray.length; ++i) {
      if (this.eventArray[i].Id === id) {
        this.eventArray.splice(i, 1);
      }
    }
  }
}
