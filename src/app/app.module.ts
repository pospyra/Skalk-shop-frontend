import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserRegistrationComponent } from './components/user-registration/user-registration.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddToCartModalComponent } from './components/add-to-cart-modal/add-to-cart-modal.component';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserRegistrationComponent,
    UserLoginComponent,
    AddToCartModalComponent,
    ShoppingCartComponent
  ],
  imports: [
    ReactiveFormsModule ,
    RouterModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule
  ],
  providers:
  [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
