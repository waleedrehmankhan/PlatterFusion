import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  baseUrl = 'https://localhost:5001/api/';


  constructor(private http: HttpClient) { }

  getEvents(model: any) {
    return this.http.post(this.baseUrl + 'event/all', model);
  }

  deleteEvent(model: any) {
    return this.http.post(this.baseUrl + 'event/delete', model);
  }

  saveEvent(model: any) {
    return this.http.post(this.baseUrl + 'event/save', model);
  }

}
