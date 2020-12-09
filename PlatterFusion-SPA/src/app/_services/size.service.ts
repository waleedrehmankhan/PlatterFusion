import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SizeService {
  baseUrl = environment.apiUrl;


  constructor(private http: HttpClient) { }

  getSizes(model: any) {
    return this.http.post(this.baseUrl + 'product/sizes', model);
  }
}
