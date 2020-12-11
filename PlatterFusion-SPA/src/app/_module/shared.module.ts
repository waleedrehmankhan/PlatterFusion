import { ArchwizardModule } from 'angular-archwizard';
import { MatRadioModule } from '@angular/material/radio';
import { ToastrModule } from 'ngx-toastr';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PictureUploaderComponent } from './picture-uploader/picture-uploader.component';
import { Angular2PromiseButtonModule } from 'angular2-promise-buttons';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    PictureUploaderComponent
  ],
  imports: [
    CommonModule,
    BsDropdownModule.forRoot(),
    Angular2PromiseButtonModule.forRoot(),
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    }),
    Angular2PromiseButtonModule.forRoot({
      spinnerTpl: `<div class="btn-spinner">
        <div class="sk-fading-circle">
          <div class="sk-circle1 sk-circle"></div>
          <div class="sk-circle2 sk-circle"></div>
          <div class="sk-circle3 sk-circle"></div>
          <div class="sk-circle4 sk-circle"></div>
          <div class="sk-circle5 sk-circle"></div>
          <div class="sk-circle6 sk-circle"></div>
          <div class="sk-circle7 sk-circle"></div>
          <div class="sk-circle8 sk-circle"></div>
          <div class="sk-circle9 sk-circle"></div>
          <div class="sk-circle10 sk-circle"></div>
          <div class="sk-circle11 sk-circle"></div>
          <div class="sk-circle12 sk-circle"></div>
        </div>
      </div>`,
    }),
    GooglePlaceModule,
    MatRadioModule,
    ReactiveFormsModule,
    ArchwizardModule

  ],
  exports: [
    Angular2PromiseButtonModule, 
    PictureUploaderComponent, 
    GooglePlaceModule, 
    MatRadioModule,
    ReactiveFormsModule,
    ArchwizardModule
  ]
})
export class SharedModule { }
