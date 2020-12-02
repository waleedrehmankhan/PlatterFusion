import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EventService } from '../_services/event.service';
import { AddEventBindingModel } from '../_models/bindingModels';
import { NoteRegex, NameRegex } from '../shared/custom-validators';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css'],
})
export class AddEventComponent implements OnInit {
  model: AddEventBindingModel = new AddEventBindingModel();
  validationErrors: string[] = [];
  queryParams: { [key: string]: Object } = {};

  eventForm: FormGroup;

  constructor(
    private eventService: EventService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.setupForm();
    this.route.queryParams
      .subscribe((params: AddEventBindingModel) => {
        if (params.id != null) {
          this.eventForm.setValue({
            id: params.id,
            name: params.name,
            description: params.description
          });
        }
      });
  }

  setupForm(): void {
    this.eventForm = this.formBuilder.group({
      id: ['', Validators.required],
      name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(60), Validators.pattern(NameRegex)]),
      description: new FormControl('', [Validators.required, Validators.maxLength(500), Validators.pattern(NoteRegex)])
    });
  }

  Create() {
    if (this.eventForm.valid) {
      this.model = this.eventForm.value;
      this.eventService.saveEvent(this.model).subscribe((response: any) => {
        this.toastr.success(response.message.msg);
        this.router.navigateByUrl('/event');
      }, error => {
        this.validationErrors = error;
      });
    }
  }
}

