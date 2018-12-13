import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SharedModule } from './shared/shared.module';
import { HomepageModule } from './homepage/homepage.module';
import { SearchpageModule } from './searchpage/searchpage.module';
import { NotFoundErrorModule } from './not-found-error/not-found-error.module';
import { DatabaseModule } from './database/database.module';
import { ParameterPageModule } from './parameter-page/parameter-page.module';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule,
    HomepageModule,
    SearchpageModule,
    NotFoundErrorModule,
    DatabaseModule,
    ParameterPageModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
