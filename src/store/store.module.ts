import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionReducer, MetaReducer, StoreModule as NgrxStoreModule } from "@ngrx/store";
import { USER_STORE_CONFIG, userStore } from "@modules/user/store/user.store";
import { TASK_STORE_CONFIG, taskStore } from "@modules/task/store/task.store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { environment } from "@environments/environment";

export function storeDebugMiddleware (reducer: ActionReducer<any>): ActionReducer<any> {
  return function (state, action) {

    if (!environment.production && environment.debug) {
      console.log('state', state);
      console.log('action', action);

      return reducer(state, action);
    }
  };
}

// export const metaReducers: MetaReducer<any>[] = [storeDebugMiddleware];

// export const rootReducers: Record<string, ActionReducer<unknown>> = {}

@NgModule({
  declarations: [],
  exports: [
    NgrxStoreModule,
  ],
  imports: [
    CommonModule,
    NgrxStoreModule.forRoot(),
    NgrxStoreModule.forFeature(userStore.feature),
    NgrxStoreModule.forFeature(taskStore.feature),

    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
  ],
  providers: [
    USER_STORE_CONFIG,
    TASK_STORE_CONFIG
  ]
})
export class StoreModule {
}
