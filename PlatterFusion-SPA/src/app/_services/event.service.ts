import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY } from 'rxjs';
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

    setTimeout(() => {
      this.messageSource.next('');
    }, 100);
  }

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
