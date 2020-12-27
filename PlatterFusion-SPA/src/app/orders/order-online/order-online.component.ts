import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { WizardComponent } from 'angular-archwizard';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { OrderService } from '../../_services/order.service';
import { CreditCardInfoBindingModel, PaymentCreateBindingModel } from '../../_models/orderDto';
import { StripeService, StripeCardComponent} from 'ngx-stripe';
import { badRequestErrorHandler, validateAllFormFields } from 'shared/common/form-helpers';
import {
  StripeCardElementOptions,
  StripeElementsOptions
} from '@stripe/stripe-js';

const EmailRegex = new RegExp('^[a-zA-Z0-9_\\.-]+@([a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,6}$');
const NameRegex = new RegExp('[a-zA-Z]');

@Component({
  selector: 'app-order-online',
  templateUrl: './order-online.component.html',
  styleUrls: ['./order-online.component.css']
})

export class OrderOnlineComponent implements OnInit {
  errors: string[] = [];
  model: any = {};
  payModel: PaymentCreateBindingModel = new PaymentCreateBindingModel();

  validationErrors: string[] = [];
  sizes = ['Small(Feeds 1-2)', 'Medium(Feeds 4-6)', 'Large(Feeds 6 - 10)'];
  formattedaddress = "";
  latitude: number;
  longitude: number;
  
  datepickerModel: any;
  isSuccess: boolean = false;
  isLoading: any;
  closeResult = '';
  modalRef: BsModalRef;
  isAddressAdded = false;
  isSubmitted = true;
  isAddressDetailSubmitted = true;
  isAddressSubmitted: boolean = false;
  hasPaymentInfo: boolean;
  registerForm: FormGroup;

  //card
  cardInfo: CreditCardInfoBindingModel = new CreditCardInfoBindingModel();
  @ViewChild(StripeCardComponent) card: StripeCardComponent;

  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        fontWeight: '300',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#CFD7E0'
        }
      }
    }
  };

  elementsOptions: StripeElementsOptions = {
    locale: 'en'
  };

  configTemplateAddress = {
    backdrop: true,
    ignoreBackdropClick: true,
    class: 'modal-md modal-dialog modal-dialog-centered modal-dialog-scrollable'
  };

  options = {
    componentRestrictions: {
      country: ["AU"]
    }
  }

  @ViewChild("startupwizard", { static: false })
  public wizard: WizardComponent;

  constructor(private modalService: BsModalService, private stripeService: StripeService,
    private orderService: OrderService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.setupForm();
  }

  setupForm(): void {
    this.registerForm = this.formBuilder.group({
      addressInfo: this.formBuilder.group({
        deliveryAddress: new FormControl('', [Validators.required])
      }),
      contactInfo: this.formBuilder.group({
        firstName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(60), Validators.pattern(NameRegex)]),
        lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(60), Validators.pattern(NameRegex)]],
        email: ['', [Validators.required, Validators.pattern(EmailRegex)]],
        phoneNumber: ['', [Validators.required, Validators.minLength(12)]]
      }),
      cardInfo: this.formBuilder.group({
        cardholderName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(60), Validators.pattern(NameRegex)])
      })
    });
  }

  addToMyAddress(addressDetailform: NgForm) {
    this.isAddressDetailSubmitted = false;
    if (!addressDetailform.valid) {
      return false;
    } else {
      debugger;
      this.model;
      this.modalRef.hide();
    }
  }

  addressChange(address: any, templateAddress: TemplateRef<any>) {
    //setting address from API to local variable
    this.formattedaddress = address.formatted_address;
    this.isAddressAdded = true;
    this.modalRef = this.modalService.show(templateAddress, this.configTemplateAddress);
    if (address.geometry !== undefined || address.geometry !== null) {
      this.latitude = address.geometry.location.lat();
      this.longitude = address.geometry.location.lng();
    };
  }

  register() {
    debugger;
    this.isSuccess = true;
    return;
  }

  onNextStep(index: number) {
    //if (this.isAddressAdded == false) {
    //  this.isAddressSubmitted = true;
    //  return;
    //}
      switch (index) {
        case 1: {

          var addressInfoGroup = this.registerForm.get('addressInfo') as FormGroup;
          if (addressInfoGroup.valid) {
            this.model = addressInfoGroup.value;
            this.wizard.goToNextStep();
          }
          else {
            validateAllFormFields(addressInfoGroup);
          }
          break;
        }

        case 2: {
          var contactInfoGroup = this.registerForm.get('contactInfo') as FormGroup;
          if (contactInfoGroup.valid) {
            this.wizard.goToNextStep();
          } else {
            validateAllFormFields(contactInfoGroup);
          }
          break;
        }
        case 3: {
          var cardInfoGroup = this.registerForm.get('cardInfo') as FormGroup;
          if (cardInfoGroup.valid) {
            let cardholderName = cardInfoGroup.get('cardholderName').value;
            this.stripeService.createToken(this.card.element, { name: cardholderName }).subscribe(result => {
              if (result.token) {
                this.model.stripeToken = result.token.id;
                this.wizard.goToNextStep();
                //this.payModel.cardholderName = cardholderName;
                //this.payModel.amount = 200;
                //this.payModel.email = "a@a.com";
                //this.orderService.addPayment(this.payModel)
                //  .subscribe(cardInfo => {
                //    this.cardInfo = cardInfo;
                //    debugger;

                //    
                //  })
                //  , errorResult => {
                //    this.isLoading = false;
                //    badRequestErrorHandler(errorResult, cardInfoGroup, this.errors);
                //  }
                }
              });
           
          } else {
            validateAllFormFields(cardInfoGroup);
          }
        }
      }
  }

  onPrevStep(index: number) {
    this.wizard.goToPreviousStep();
  }
}
