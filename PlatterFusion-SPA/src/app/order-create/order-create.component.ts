import { ProductDto } from './../_models/productDto';
import { SizeDto } from './../_models/sizeDto';
import { SizeService } from './../_services/size.service';
import { CustomerDto } from './../_models/customerDto';
import { ProductService } from './../_services/product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'order-create',
  templateUrl: './order-create.component.html',
  styleUrls: ['./order-create.component.css']
})
export class OrderCreateComponent implements OnInit {

  formattedaddress = "";
  productArray: ProductDto[];
  productSizeArray: SizeDto[];
  customerModel: any = {};
  selectedProduct: any = {};

  constructor(private productService: ProductService, private sizeService: SizeService) { }

  ngOnInit(): void {
    this.getProducts();
    this.getSizes();
  }

  options = {
    componentRestrictions: {
      country: ["AU"]
    }
  }
  public AddressChange(address: any) {
    //setting address from API to local variable 
    this.formattedaddress = address.formatted_address
  }

  getProducts() {
    this.productService.getProducts({ id: 0 }).subscribe((response: any) => {
      this.productArray = response.data.Items;
      console.log(this.productArray);
    });
  }

  getSizes() {
    this.sizeService.getSizes({ id: 0 }).subscribe((response: any) => {
      debugger;
      this.productSizeArray = response.data.Items;
      console.log(this.productSizeArray);
    });
  }

  loadProduct(model: any) {
    this.selectedProduct = model;
  }

  show() {
    console.log(this.customerModel);
  }


}
