import { environment } from '../../environments/environment';
import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  baseUrl = 'https://platterfusion.azurewebsites.net/api/';
  constructor(private http: HttpClient) { }

  postData(url: string, body: any): Observable<any> {
    console.log(this.baseUrl);
    return this.http.post<any>(this.baseUrl + url, body);
  }
}
