import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
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
  closeResult = ''; 
  constructor(private productService: ProductService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getProducts();
    this.onProductSelect(5 as any);
  }

  @ViewChild("startupwizard", { static: false })
  public wizard: WizardComponent;


  open(content) {
    this.modalService.open(content,
      { ariaLabelledBy: 'modal-basic-title' }).result.
      then((result) => {

        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult =
          `Dismissed ${this.getDismissReason(reason)}`;
      });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  } 


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
