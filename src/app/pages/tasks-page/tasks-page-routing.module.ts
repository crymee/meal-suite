import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { TasksPageComponent } from "@app/pages/tasks-page/tasks-page.component";
import { TasksResolver } from "@modules/task/resolvers/tasks.resolver";
import { UsersResolver } from "@modules/user/resolvers/users.resolver";


@NgModule({
  exports: [
    RouterModule
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        resolve: {
          tasks: TasksResolver,
          users: UsersResolver
        },
        component: TasksPageComponent
      }
    ])
  ]
})
export class TasksPageRoutingModule {
}
