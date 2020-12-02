import { JwtInterceptor } from './_interceptors/jwt.interceptor';
import { ErrorInterceptor } from './_interceptors/error.interceptor';
import { SharedModule } from './_module/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { EventComponent } from './event/event.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AddEventComponent } from './add-event/add-event.component';
import { LoginComponent } from './login/login.component';
import { AppHeaderComponent } from './_layout/app-header/app-header.component';
import { AppLayoutComponent } from './_layout/app-layout/app-layout.component';
import { SiteFooterComponent } from './_layout/site-footer/site-footer.component';
import { SiteHeaderComponent } from './_layout/site-header/site-header.component';
import { SiteLayoutComponent } from './_layout/site-layout/site-layout.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NotFoundComponent } from './not-found/not-found.component';
import { NgxErrorsModule } from '@ultimate/ngxerrors';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    EventComponent,
    SidebarComponent,
    AddEventComponent,
    LoginComponent,
    AppHeaderComponent,
    AppLayoutComponent,
    SiteFooterComponent,
    SiteHeaderComponent,
    SiteLayoutComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgxErrorsModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot()
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
