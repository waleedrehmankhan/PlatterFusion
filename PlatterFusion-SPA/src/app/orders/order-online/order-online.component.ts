import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { WizardComponent } from 'angular-archwizard';
import { ProductDto } from '../../_models/productDto';
import { ProductService } from '../../_services/product.service';

@Component({
  selector: 'app-order-online',
  templateUrl: './order-online.component.html',
  styleUrls: ['./order-online.component.css']
})
export class OrderOnlineComponent implements OnInit {

  model: any = {};
  productArray: ProductDto[];
  productSelected: ProductDto = new ProductDto();
  isSuccess: boolean = false;
  isLoading: any;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  @ViewChild("startupwizard", { static: false })
  public wizard: WizardComponent;

  onNextStep(index: number) {
    switch (index) {
      case 1: {
        this.wizard.goToNextStep();
        break;
      }
      case 2: {
        this.wizard.goToNextStep();
        break;
      }
      case 3: {
        this.wizard.goToNextStep();
        break;
      }
    }
  }

  register() {
    this.isSuccess = true;
    return;
  }

  onPrevStep(index: number) {
    this.wizard.goToPreviousStep();
  }

  onProductSelect($event) {
    this.productService.getProducts({ id: $event }).subscribe((response: any) => {
      this.productSelected = response.data.Items[0];
    });
  }

  getProducts() {
    this.productService.getProducts({ id: 0 }).subscribe((response: any) => {
      this.productArray = response.data.Items;
    });
  }

}
