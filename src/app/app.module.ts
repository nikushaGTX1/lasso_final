import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Navigation } from './navigation/navigation';
import { Main } from './main/main';
import { Footer } from './footer/footer';
import { About } from './about/about';
import { Products } from './products/products';
import { DetailsPage } from './details-page/details-page';
import { Admin } from './admin/admin';
import { Login } from './auth/login/login';
import { Register } from './auth/register/register';
import { AdminAddCard } from './admin-add-card/admin-add-card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Contact } from './contact/contact';
import { Qrcode } from './qrcode/qrcode';



@NgModule({
  declarations: [
    App,
    Navigation,
    Main,
    Footer,
    About,
    Products,
    DetailsPage,
    Admin,
    Login,
    Register,
    AdminAddCard,
    Contact,
    Qrcode
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
