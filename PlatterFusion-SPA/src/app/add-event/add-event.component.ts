import { EventDto } from './../_models/eventDto';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../_services/data.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css'],
})
export class AddEventComponent implements OnInit {
  createUrl: any = 'event/save';
  eventDto = new EventDto();

  constructor(
    private _dataService: DataService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  eventForm = new FormGroup({
    Name: new FormControl(''),
    Description: new FormControl(''),
  });

  ngOnInit(): void {}

  onSubmit() {
    console.warn('Your order has been submitted', this.eventForm.value);
    this.eventDto.Name = this.eventForm.value.Name;
    this.eventDto.Description = this.eventForm.value.Description;
    this.eventDto.isActive = true;

    this._dataService
      .postData(this.createUrl, this.eventDto)
      .subscribe((response) => {
        this.toastr.success(response.message.msg);
        this.router.navigateByUrl('/event');
      });
  }
}
