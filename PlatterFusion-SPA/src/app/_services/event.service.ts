import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  baseUrl = environment.apiUrl;

  private messageSource = new BehaviorSubject('');
  currentMessage = this.messageSource.asObservable();

  constructor(private http: HttpClient) { }

  changeMessage(message: string) {
    this.messageSource.next(message)
  }

  getEvents(model: any) {
    return this.http.post(this.baseUrl + 'event/all', model);
  }

  deleteEvent(model: any) {
    return this.http.post(this.baseUrl + 'event/delete', model);
  }

  saveEvent(model: any) {
    debugger;
    return this.http.post(this.baseUrl + 'event/save', model);
  }

}
