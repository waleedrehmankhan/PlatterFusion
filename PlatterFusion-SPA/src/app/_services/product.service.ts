import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getProducts(model: any) {
    return this.http.post(this.baseUrl + 'product/all', model);
  }

  deleteProduct(model: any) {
    return this.http.post(this.baseUrl + 'product/delete', model);
  }

  saveProduct(model: any) {
    return this.http.post(this.baseUrl + 'product/save', model);
  }
}
