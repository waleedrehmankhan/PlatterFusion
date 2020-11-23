import { Event } from './../_models/events';
import { DataService } from './../_services/data.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css'],
})
export class EventComponent implements OnInit {

  eventArray: Event[];
  loadAllUrl: any = 'event/all';
  deleteUrl: any = 'event/delete';
  editUrl: any = 'event/edit';
  refresh = new Subject<boolean>();

  constructor(
    private _dataService: DataService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loatEvents();
  }

  loatEvents() {
    this._dataService
      .postData(this.loadAllUrl, { id: 0 })
      .subscribe((response) => {
        this.eventArray = response.data.Items;
        console.log(this.eventArray);
      });
  }

  editClicked($data) {
    console.log($data);
  }

  deleteClicked(data) {
    this._dataService
      .postData(this.deleteUrl, { id: data })
      .subscribe((response) => {
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
