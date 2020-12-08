import { Component, Input, forwardRef, ViewChild, OnInit, Output, ElementRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-picture-uploader',
  templateUrl: './picture-uploader.component.html',
  styleUrls: ['./picture-uploader.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => PictureUploaderComponent),
    multi: true
  }]
})
export class PictureUploaderComponent implements OnInit, ControlValueAccessor {

  @Input() width: number = 300;
  @Input() height: number = 300;
  @Input() url: any;
  @Input() editMode = false;
  @Input() skin: string = 'default';
  private innerValue: any;

  @Output()
  @ViewChild('pictureInput', { read: ElementRef, static: false })
  fileInput: any;

  constructor(private toasterService: ToastrService) {
  }

  ngOnInit(): void {
  }

  // get accessor
  get value(): any {
    return this.innerValue;
  };

  // set accessor including call the onchange callback
  set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
    }
  }

  // the method set in registerOnChange, it is just a placeholder for a method that takes one parameter, 
  // we use it to emit changes back to the form
  private propagateChange = (_: any) => { };

  writeValue(obj: any): void {
    this.innerValue = obj;
    if (this.innerValue !== null && this.innerValue !== undefined && this.innerValue !== "") {
      this.url = this.innerValue;
    }
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  onImageClick(event: any): void {
    if (this.editMode)
      this.fileInput.nativeElement.click();
  }

  onChange(event: any): void {
    if (event.target.files && event.target.files[0]) {
      var file = event.target.files[0];
      // only allow gif, jpeg or png
      var allowedExtensions = /(jpg|jpeg|png|gif)$/i;
      if (!allowedExtensions.exec(file['type'])) {
        this.toasterService.success('Success!');
        return;
      }
      this.innerValue = file;
      this.propagateChange(this.innerValue);
      var reader = new FileReader();
      reader.onload = (e: any) => {
        this.url = e.target.result;
      }
      reader.readAsDataURL(file);
    }
  }

  convertImageToBase64(img) {
  var canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;

  var ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0);

  var dataURL = canvas.toDataURL("image/png");

  return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}

  removeImage() {
    this.innerValue = null;
    this.fileInput.nativeElement.value = '';
    this.propagateChange(this.innerValue);
    this.url = '';
  }
  registerOnTouched(fn: any): void { }
  setDisabledState?(isDisabled: boolean): void { }
}
