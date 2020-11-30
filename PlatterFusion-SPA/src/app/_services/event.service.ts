import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  baseUrl = environment.apiUrl;

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
