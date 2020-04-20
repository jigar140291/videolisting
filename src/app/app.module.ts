import { BrowserModule } from '@angular/platform-browser';
import {CommonModule} from '@angular/common';

import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageModule } from './pages/page.module';
import { HttpService } from './services/http.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpModule,
    PageModule
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
