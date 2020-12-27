import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ProductDto } from '../../_models/productDto';
import { ProductService } from '../../_services/product.service';
import { OrderService } from '../../_services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-menu',
  templateUrl: './order-menu.component.html',
  styleUrls: ['./order-menu.component.css']
})

export class OrderMenuComponent implements OnInit {

  model: any = {};
  modalRef: BsModalRef;
  productArray: ProductDto[];
  isSubmitted: boolean = true;
  isAddedToMyOrder: boolean = false;
  isDateTimeSubmitted = false;
  requestDiv: boolean = true;
  productSelected: ProductDto = new ProductDto();
  validationErrors: string[] = [];
  i = 1;
  items = 0;
  delivery = 15;
  quantity: number = 1;
  subtotal = 0;
  today = new Date();

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
    if (orderDetailform.valid) {
      if (this.model.Size == "small") {
        this.productSelected.Price += 0;
      }
      if (this.model.Size == "medium") {
        this.productSelected.Price += 20;
      }
      if (this.model.Size == "large") {
        this.productSelected.Price += 40;
      }
      if (this.model.Special == true) {
        this.productSelected.Price += 3;
      }
      if (this.quantity > 1) {
        this.productSelected.Price *= this.quantity;
      }
      this.subtotal = this.productSelected.Price;
      this.isAddedToMyOrder = false;
      this.modalRef.hide();

    } else {
      return false;
    }
  }

  addOrder(orderForm: NgForm) {
    if (this.isSubmitted == true) {
      this.isAddedToMyOrder = true;
      return;
    }
    this.isDateTimeSubmitted = true;
    if (orderForm.valid) {
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
      this.subtotal = this.productSelected.Price;
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
