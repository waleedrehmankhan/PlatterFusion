import { AccountService } from './../_services/account.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private accountService: AccountService, private router: Router) {}
  
  canActivate(): Observable<boolean> {
    debugger;
    return this.accountService.currentUser$.pipe(
      map(user => {
        debugger;
        if (user) { return true; }
        debugger;
        this.router.navigateByUrl('/login');
      })
    );
  }
}
