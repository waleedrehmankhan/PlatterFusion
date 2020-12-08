import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../_services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {
  model: any = {};
  validationErrors: string[] = [];

  constructor(private productService: ProductService,
              private toastr: ToastrService,
              private router: Router) { }

  ngOnInit(): void {
  }

  Create() {
    this.productService.saveProduct(this.model).subscribe((response: any) => {
      this.toastr.success(response.message.msg);
      this.router.navigateByUrl('/app/product/view');
    }, error => {
      this.validationErrors = error;
    });
  }

}
