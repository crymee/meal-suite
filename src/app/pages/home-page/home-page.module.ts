import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page.component';
import { HomePageRoutingModule } from "@app/pages/home-page/home-page-routing.module";

@NgModule({
    declarations: [
        HomePageComponent
    ],
    imports: [
        CommonModule,
        HomePageRoutingModule
    ]
})
export class HomePageModule {
}
