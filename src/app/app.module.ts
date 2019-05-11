
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { ClipListComponent } from './clip-list/clip-list.component';
import { ClipListRowComponent } from './clip-list-row/clip-list-row.component';
import { AfterLoginComponent } from './after-login/after-login.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { MatDialogModule } from '@angular/material/dialog';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule, MatButtonModule, MatInputModule, MatProgressBarModule } from '@angular/material';
import { AddNewDialog } from './clip-list/add-new-dialog';
import { FormsModule } from '@angular/forms';
import { IconButtonComponent } from './common/icon-button/icon-button.component';
import { ProgressComponent } from './progress/progress.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ClipListComponent,
    ClipListRowComponent,
    AfterLoginComponent,
    AddNewDialog,
    IconButtonComponent,
    ProgressComponent
  ],
  entryComponents:[AddNewDialog],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    MatProgressBarModule
  ],
  exports:[
    MatDialogModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
