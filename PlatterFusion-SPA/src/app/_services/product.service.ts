import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BaseService } from 'shared/services/base.service';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends BaseService {
  baseUrl = environment.apiUrl;

  private messageSource = new BehaviorSubject('');
  currentMessage = this.messageSource.asObservable();

  constructor(private http: HttpClient) {
      super();
  }

  changeMessage(message: string) {
    this.messageSource.next(message);

    setTimeout(() => {
      this.messageSource.next('');
    }, 100);
  }

  getProducts(model: any) {
    return this.http.post(this.baseUrl + 'product/all', model)
      .pipe(tap(c => c), catchError(this.errorHandler));;
  }

  deleteProduct(model: any) {
    return this.http.post(this.baseUrl + 'product/delete', model);
  }

  saveProduct(data: FormData): Observable<any>  {
    return this.http.post<any>(this.baseUrl + 'product/save', data);
  }
}
