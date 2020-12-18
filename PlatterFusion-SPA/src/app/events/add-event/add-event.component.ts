import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { EventService } from "src/app/_services/event.service";
import { AddEventBindingModel } from '../../_models/eventDto';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css'],
})
export class AddEventComponent implements OnInit {

  model: AddEventBindingModel = new AddEventBindingModel();
  validationErrors: string[] = [];
  promiseSetBySomeAction: any;
  subscription: Subscription;

  constructor(
    private eventService: EventService,
    private toastr: ToastrService,
    private router: Router
    ) {}
  
  ngOnInit() {
    this.subscription = this.eventService.currentMessage.pipe(first()).subscribe((response: any) => {
      if (response != '') this.model = response;
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

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
