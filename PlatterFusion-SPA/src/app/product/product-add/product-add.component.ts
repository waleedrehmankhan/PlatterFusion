import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../_services/product.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { ProductDto } from '../../_models/productDto';

declare let window: any;

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {
  model: ProductDto = new ProductDto();
  validationErrors: string[] = [];
  subscription: Subscription;
  
  constructor(private productService: ProductService,
              private toastr: ToastrService,
              private router: Router) { }

  ngOnInit() {
    this.subscription = this.productService.currentMessage.pipe(first()).subscribe((response: any) => {
      if (response != '') this.model = response;
    });
    this.model.isPictureChanged = 0;
  }

  Create() {
    if (this.model.Picture == null) this.model.isPictureChanged = 1;
    let data = window.jsonToFormData(this.model);
    this.productService.saveProduct(data).subscribe((response: any) => {
      this.toastr.success(response.message.msg);
      this.router.navigateByUrl('/app/product/view');
    }, error => {
      this.validationErrors = error;
    });
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }
}
