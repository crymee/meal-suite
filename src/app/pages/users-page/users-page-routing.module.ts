import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { UsersPageComponent } from "@app/pages/users-page/users-page.component";

@NgModule({
  exports: [
    RouterModule
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{path: '', component: UsersPageComponent}])
  ]
})
export class UsersPageRoutingModule {
}
