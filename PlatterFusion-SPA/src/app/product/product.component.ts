import { ToastrService } from 'ngx-toastr';
import { ProductService } from './../_services/product.service';
import { ProductDto } from './../_models/productDto';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  productArray: ProductDto[];


  constructor(private productService: ProductService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts({ id: 0 }).subscribe( (response: any) => {
      this.productArray = response.data.Items;
    });
  }

  editClicked($data) {
    console.log($data);
  }

  deleteClicked(data) {
    this.productService.deleteProduct({ id: data })
      .subscribe((response: any) => {
        this.removeRow(data);
        this.toastr.success(response.message.msg);
      });
  }

  removeRow(id) {
    for (let i = 0; i < this.productArray.length; ++i) {
      if (this.productArray[i].Id === id) {
        this.productArray.splice(i, 1);
      }
    }
  }

}
