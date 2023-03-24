import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { MainLayoutComponent } from "@app/layouts/main-layout/main-layout.component";

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'tasks',
        loadChildren: () => import('@app/pages/tasks-page/tasks-page.module').then(e => e.TasksPageModule),
      },
      {
        path: 'users',
        loadChildren: () => import('@app/pages/users-page/users-page.module').then(e => e.UsersPageModule),
      },
    ]
  },

]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
