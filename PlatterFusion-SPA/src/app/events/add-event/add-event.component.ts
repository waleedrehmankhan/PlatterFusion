import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EventService } from "src/app/_services/event.service";

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css'],
})
export class AddEventComponent implements OnInit {
  model: any = {};
  validationErrors: string[] = [];
  promiseSetBySomeAction: any;
  constructor(
    private eventService: EventService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.eventService.currentMessage.subscribe((response: any) => {
      if (response != '')
      this.model = response;
    });
  }

  Create() {
    this.eventService.saveEvent(this.model).subscribe((response: any) => {
      this.toastr.success(response.message.msg);
      this.router.navigateByUrl('/app/event/view');
    }, error => {
      this.validationErrors = error;
    });
  }
}

class AddEventBindingModel {
  Id: number;
  Name: string;
  Description: string;
}
