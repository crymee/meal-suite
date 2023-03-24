import { InjectionToken, Provider } from '@angular/core';
import { TaskBE, UserBE } from "../services/backend.service";
import { CamelCase } from "@app/contracts/utils.contract";

export enum AppRouteNameEnum {
  Tasks = 'TASKS',
  TaskDetail = 'TASK_DETAIL',
  Users = 'USERS',
  UserDetail = 'USER_DETAIL',
}

export type AppRoute<T extends any = null> = T extends null ? () => any[] : (data: T) => any[]

export type ResolveAppRoute<T extends AppRouteNameEnum, Data extends any = null> = Record<CamelCase<T>, AppRoute<Data>>

export type AppRoutes =
  ResolveAppRoute<AppRouteNameEnum.Tasks> &
  ResolveAppRoute<AppRouteNameEnum.TaskDetail, TaskBE['id']> &
  ResolveAppRoute<AppRouteNameEnum.Users> &
  ResolveAppRoute<AppRouteNameEnum.UserDetail, UserBE['id']>


export const appRoutes: AppRoutes = {
  users: () => ['/users'],
  userDetail: (id: string) => ['/users', id],
  tasks: () => ['/tasks'],
  taskDetail: (id: string) => ['/tasks', id]
} as const;


export const APP_ROUTES = new InjectionToken('APP_ROUTES');

export const APP_ROUTES_CONFIG = {
  provide: APP_ROUTES,
  useValue: appRoutes,
} as Provider;
