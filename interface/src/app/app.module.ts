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
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
	AppRoutingModule,
    SharedModule,
    HomepageModule,
    SearchpageModule,
    NotFoundErrorModule,
    DatabaseModule,
    ParameterPageModule,
	MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
