import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { ClipListComponent } from './clip-list/clip-list.component';
import { ClipListRowComponent } from './clip-list-row/clip-list-row.component';
import { AfterLoginComponent } from './after-login/after-login.component';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ClipListComponent,
    ClipListRowComponent,
    AfterLoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
