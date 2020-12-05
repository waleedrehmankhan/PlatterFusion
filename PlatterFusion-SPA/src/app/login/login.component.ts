import { AccountService } from './../_services/account.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model: any = {};
  validationErrors: string[] = [];

  constructor(private service: AccountService, private router: Router) { }

  ngOnInit(): void {
    if(this.service.getCurrentUser() != null) { this.router.navigateByUrl('/app/event/view')}
  }

  login() {
    this.service.login(this.model).subscribe(response => {
      console.log(response);
      this.router.navigateByUrl('/app/event/view');
    }, error => {
      console.log(error);
      this.validationErrors = error;
    });
  }
}
