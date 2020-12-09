import { SizeService } from './../_services/size.service';
import { CustomerDto } from './../_models/customerDto';
import { ProductService } from './../_services/product.service';
import { Component, OnInit } from '@angular/core';
import { ProductDto } from '../_models/productDto';

@Component({
  selector: 'order-create',
  templateUrl: './order-create.component.html',
  styleUrls: ['./order-create.component.css']
})
export class OrderCreateComponent implements OnInit {

  formattedaddress = "";
  productArray: ProductDto[];
  productSizeArray: any = {};
  customerModel: any = {};

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
    });
  }

  getSizes() {
    this.sizeService.getSizes({ id: 0 }).subscribe((response: any) => {
      debugger;
      this.productSizeArray = response.data.Items;
      console.log(this.productSizeArray);
    });
  }

  show() {
    console.log(this.customerModel);
  }


}
