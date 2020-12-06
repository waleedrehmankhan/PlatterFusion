import { ToastrModule } from 'ngx-toastr';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PictureUploaderComponent } from './picture-uploader/picture-uploader.component';



@NgModule({
  declarations: [
    PictureUploaderComponent
  ],
  imports: [
    CommonModule,
    BsDropdownModule.forRoot(),
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    })
  ],
  exports: [
    PictureUploaderComponent
  ]
})
export class SharedModule { }
