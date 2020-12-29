import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ContactAddBindingModel } from '../_models/contact';
import { BaseService } from 'shared/services/base.service';
import { catchError, tap } from 'rxjs/operators';
import { CreditCardInfoBindingModel, orderDetailModel, PaymentCreateBindingModel } from '../_models/orderDto';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class OrderService extends BaseService {

  baseUrl = environment.apiUrl;

  private messageSource = new BehaviorSubject('');
  currentMessage = this.messageSource.asObservable();

  // URL to web api
  private orderUrl: 'order'
  constructor(private http: HttpClient) { super(); }

  changeMessage(message: any) {
    this.messageSource.next(message);

    setTimeout(() => {
      this.messageSource.next('');
    }, 100);
  }

  saveOrder(order: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + this.orderUrl + '/save', order, httpOptions).pipe(
      tap((saveOrder: any) => {
        saveOrder
      }),
      catchError(this.errorHandler));
  }

  /** POST: add new contact */
  addContact(contact: ContactAddBindingModel): Observable<ContactAddBindingModel> {
    return; //this.http.post<ContactAddBindingModel>(this.baseUrl + this.contactUrl + "/Create", contact, httpOptions)
    //  .pipe(tap(c => c), catchError(this.errorHandler));
  }

  addPayment(payment: PaymentCreateBindingModel, companyId: number = 0): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'order/addpayment', payment, httpOptions).pipe(
      tap((payment: any) => {
        payment
      }),
      catchError(this.errorHandler)
    );
  }
}
