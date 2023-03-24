import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { HomePageComponent } from "@app/pages/home-page/home-page.component";

const routes: Routes = [
    {
        path: '',
        component: HomePageComponent
    }
]

@NgModule({
    exports: [RouterModule],
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ]
})
export class HomePageRoutingModule {
}
