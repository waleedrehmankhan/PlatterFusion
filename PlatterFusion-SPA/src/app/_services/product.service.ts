import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl = environment.apiUrl;

  private messageSource = new BehaviorSubject('');
  currentMessage = this.messageSource.asObservable();

  constructor(private http: HttpClient) { }

  changeMessage(message: string) {
    this.messageSource.next(message);

    setTimeout(() => {
      this.messageSource.next('');
    }, 100);
  }

  getProducts(model: any) {
    return this.http.post(this.baseUrl + 'product/all', model);
  }

  deleteProduct(model: any) {
    return this.http.post(this.baseUrl + 'product/delete', model);
  }

  saveProduct(data: FormData): Observable<any>  {
    return this.http.post<any>(this.baseUrl + 'product/save', data);
  }
}
