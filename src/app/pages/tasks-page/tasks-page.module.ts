import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksPageComponent } from './tasks-page.component';
import { TasksPageRoutingModule } from "@app/pages/tasks-page/tasks-page-routing.module";
import { TaskModule } from "../../../modules/task/task.module";
import { MatButtonModule } from "@angular/material/button";


@NgModule({
  declarations: [
    TasksPageComponent
  ],
  imports: [
    CommonModule,
    TasksPageRoutingModule,
    TaskModule,
    MatButtonModule
  ]
})
export class TasksPageModule {
}
