import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})
export class AppHeaderComponent implements OnInit {
  user: User;

  constructor(public accountService: AccountService, private router: Router) {
    this.user = accountService.getCurrentUser();
   }

  ngOnInit() {
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/login');
  }
}