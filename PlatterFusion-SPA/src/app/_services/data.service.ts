import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  baseUrl: 'https://localhost:5001/api/';
  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    return this.http.get('https://jsonplaceholder.typicode.com/posts');
  }

  postData(url: string, body: any): Observable<any> {
    console.log(this.baseUrl);
    return this.http.post<any>(this.baseUrl + url, body);
  }
}
