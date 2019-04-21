import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AfterLoginComponent } from './after-login/after-login.component';

const routes: Routes = [
 {path:'' , component:HomeComponent},
 {path:'logined' , component:AfterLoginComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
