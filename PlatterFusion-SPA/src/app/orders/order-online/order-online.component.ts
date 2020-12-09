import { Component, OnInit, ViewChild } from '@angular/core';
import { WizardComponent } from 'angular-archwizard';

@Component({
  selector: 'app-order-online',
  templateUrl: './order-online.component.html',
  styleUrls: ['./order-online.component.css']
})
export class OrderOnlineComponent implements OnInit {

  model: any = {};
  isSuccess: boolean = false;
  isLoading: any;
  constructor() { }

  ngOnInit(): void {
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
}
