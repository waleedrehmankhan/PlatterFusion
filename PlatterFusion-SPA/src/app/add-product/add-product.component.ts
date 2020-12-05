import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from './../_services/product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  model: any = {};
  validationErrors: string[] = [];

  constructor(private productService: ProductService,
              private toastr: ToastrService,
              private router: Router) { }

  ngOnInit(): void {
  }

  Create() {
    debugger;
    this.productService.saveProduct(this.model).subscribe((response: any) => {
      debugger;
      this.toastr.success(response.message.msg);
      this.router.navigateByUrl('/product');
    }, error => {
      this.validationErrors = error;
    });
  }

}
