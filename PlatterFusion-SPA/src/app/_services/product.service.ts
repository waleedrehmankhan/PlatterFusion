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
    const formData = new FormData();
    formData.append("Name", model.Name);
    formData.append("Description", model.Description); 
    formData.append("Picture", model.Picture); 
    formData.append("Price", model.Price); 
    return this.http.post(this.baseUrl + 'product/save', formData);
  }
}
