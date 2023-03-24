import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainLayoutModule } from "@app/layouts/main-layout/main-layout.module";
import { StoreModule } from "@store/store.module";
import { APP_ROUTES_CONFIG } from "@config/app-routes.config";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MainLayoutModule,
    BrowserAnimationsModule,
    StoreModule,
  ],
  providers: [
    APP_ROUTES_CONFIG
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
