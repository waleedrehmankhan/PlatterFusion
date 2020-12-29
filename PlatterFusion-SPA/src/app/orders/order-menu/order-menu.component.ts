import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ProductDto } from '../../_models/productDto';
import { ProductService } from '../../_services/product.service';
import { OrderService } from '../../_services/order.service';
import { Router } from '@angular/router';
import { orderDetailModel } from '../../_models/orderDto';

@Component({
  selector: 'app-order-menu',
  templateUrl: './order-menu.component.html',
  styleUrls: ['./order-menu.component.css']
})

export class OrderMenuComponent implements OnInit {

  model: any = {};
  orders =  Array();
  modalRef: BsModalRef;
  productArray: ProductDto[];
  isSubmitted: boolean = true;
  isAddedToMyOrder: boolean = false;
  isDateTimeSubmitted = false;
  requestDiv: boolean = true;
  productSelected: ProductDto = new ProductDto();
  order: orderDetailModel = new orderDetailModel();
  validationErrors: string[] = [];
  i = 1;
  items = 0;
  delivery = 15;
  quantity: number = 1;
  subtotal: number = 0;
  today = new Date();
  time = Date;

  constructor(private productService: ProductService, private modalService: BsModalService,
    private orderService: OrderService, private router: Router) { }

  configTemplateProduct = {
    backdrop: true,
    ignoreBackdropClick: true,
    class: 'modal-lg modal-dialog modal-dialog-centered modal-dialog-scrollable'
  };

  ngOnInit(): void {
    this.getProducts();
    this.onProductSelect(event);
  }

  openModal(templateProduct: TemplateRef<any>) {
    this.modalRef = this.modalService.show(templateProduct, this.configTemplateProduct);
  }

  getProducts() {
    this.productService.getProducts({ id: 0 }).subscribe((response: any) => {
      this.productArray = response.data.Items;
    });
  }

  //Object.assign({ }, { })
  addToMyOrder(orderDetailform: NgForm) {
    this.isSubmitted = false;
    var productPrice = this.productSelected.Price;
    if (orderDetailform.valid) {
      if (this.model.Size == "Small(Feeds 1-2)") {
        productPrice += 0;
      }
      if (this.model.Size == "Medium(Feeds 4-6) +$20") {
        productPrice += 20;
      }
      if (this.model.Size == "Large(Feeds 6-10) +$40") {
        productPrice += 40;
      }
      if (this.model.Special == true) {
        productPrice += 3;
      }
      if (this.quantity > 1) {
        productPrice *= this.quantity;
      }
      this.subtotal += productPrice;
      this.orders.push({
        'quantity': this.quantity,
        'name': this.productSelected.Name,
        'size': this.model.Size,
        'personalized': this.model.Special,
        'price': productPrice
      });
      productPrice = 0;
      this.isAddedToMyOrder = false;
      this.modalRef.hide();
    } else {
      return false;
    }
  }

  listItemRemove(index) {
    this.subtotal -= this.orders[index].price;
    this.orders.splice(index, 1);
  }

  addOrder(orderForm: NgForm) {
    if (this.isSubmitted == true) {
      this.isAddedToMyOrder = true;
      return;
    }
    this.isDateTimeSubmitted = true;
    if (orderForm.valid) {
      var time = new Date(orderForm.controls['timepicker'].value).toTimeString().split(" ")[0];
      this.order.orders = this.orders;
      this.order.subtotal = this.subtotal;
      this.order.delivery = this.delivery;
      this.order.time = time;
      this.orderService.changeMessage(this.order);

      this.router.navigateByUrl('/app/order/online');
      //this.orderService.saveOrder(this.model).subscribe((response: any) => {

      //  this.router.navigateByUrl('/app/order/online');
      //}, error => {
      //  this.validationErrors = error;
      //});
    }
  }

  onProductSelect($event) {
    this.productService.getProducts({ id: $event }).subscribe((response: any) => {
      this.productSelected = response.data.Items[0];
    });
  }


  plus() {
    if (this.i != 100) {
      this.i++;
      this.quantity = this.i;
    }
  }

  minus() {
    if (this.i != 1) {
      this.i--;
      this.quantity = this.i;
    }
  }
}
