import { Feature } from "@ngrx/store/src/feature_creator";
import { Comparer, EntityState, IdSelector } from "@ngrx/entity/src/models";
import {
  ActionCreator,
  ActionReducer,
  createAction,
  createFeature,
  createReducer,
  createSelector,
  DefaultProjectorFn,
  MemoizedSelector,
  on,
  props
} from "@ngrx/store";
import {
  createEntityAdapter,
  Dictionary,
  EntityAdapter,
  EntityMap,
  EntityMapOne,
  Predicate,
  Update
} from "@ngrx/entity";
import { TypedAction } from "@ngrx/store/src/models";
import { CamelCase, CamelToSnakeCase } from "@app/contracts/utils.contract"
import { startCase } from "lodash";
import { ReducerTypes } from "@ngrx/store/src/reducer_creator";

export type EntityStateExtra<T> = EntityState<T> & {
  ids: string[],
  entities: [],
  selectedEntityId: string | null
}

export enum EntityStoreEnum {
  TaskStore = 'TASK',
  UserStore = 'USER',
}

export enum EntityFeatureNameEnum {
  Task = 'task',
  User = 'user',
}

export type EntityEntry<T extends string> = Uppercase<CamelToSnakeCase<T>>
export type EntityFeatureName<T extends string> = `${CamelCase<Lowercase<CamelToSnakeCase<T>>>}Feature`
export type EntityAction<T> = ActionCreator<string, (props: { entity: T }) => ({ entity: T } & TypedAction<string>)>
export type DeleteEntityAction<T> = ActionCreator<string, (props: { id: string }) => ({ id: string } & TypedAction<string>)>
export type EntityMapAction<T> = ActionCreator<string, (props: { entityMap: EntityMapOne<T> }) => ({ entityMap: EntityMapOne<T> } & TypedAction<string>)>
export type UpdateEntityAction<T> = ActionCreator<string, (props: { update: Update<T> }) => ({ update: Update<T> } & TypedAction<string>)>
export type EntitiesAction<T> = ActionCreator<string, (props: { entities: T[] }) => ({ entities: T[] } & TypedAction<string>)>
export type EntitiesMapAction<T> = ActionCreator<string, (props: { entityMap: EntityMap<T> }) => ({ entityMap: EntityMap<T> } & TypedAction<string>)>
export type DeleteEntitiesAction<T> = ActionCreator<string, (props: { ids: string[] }) => ({ ids: string[] } & TypedAction<string>)>
export type UpdateEntitiesAction<T> = ActionCreator<string, (props: { updates: Update<T>[] }) => ({ updates: Update<T>[] } & TypedAction<string>)>
export type DeleteEntitiesByPredicateAction<T> = ActionCreator<string, (props: { predicate: Predicate<T> }) => ({ predicate: Predicate<T> } & TypedAction<string>)>
export type ClearEntitiesAction<T> = ActionCreator<string, () => TypedAction<string>>
export type SelectEntityId = MemoizedSelector<Record<string, any>, string, DefaultProjectorFn<string>>
export type SelectAllEntity<T> = MemoizedSelector<Record<string, any>, T[], DefaultProjectorFn<T[]>>
export type SelectEntities<T> = MemoizedSelector<Record<string, any>, Dictionary<T> & [], DefaultProjectorFn<Dictionary<T> & []>>
export type SelectEntity<T> = (id: string) => MemoizedSelector<Record<string, any>, T, DefaultProjectorFn<T>>
export type SelectIds = MemoizedSelector<Record<string, any>, string[], DefaultProjectorFn<string[]>>
export type SelectState<T> = MemoizedSelector<Record<string, any>, EntityStateExtra<T>, DefaultProjectorFn<EntityStateExtra<T>>>
export type EntityReducer<T> = ReducerTypes<EntityStateExtra<T>, readonly ActionCreator[]>

export interface EntityStoreContract<F extends string, EntityType> {
  readonly feature: Feature<Record<string, any>, EntityFeatureName<F>, EntityStateExtra<EntityType>>
  readonly selectId?: IdSelector<EntityType>;
  readonly sortComparer?: false | Comparer<EntityType>;

  readonly loadEntitiesAction: EntitiesAction<EntityType>

  readonly setEntitiesAction: EntitiesAction<EntityType>
  readonly addEntityAction: EntityAction<EntityType>
  readonly setEntityAction: EntityAction<EntityType>
  readonly upsertEntityAction: EntityAction<EntityType>
  readonly addEntitiesAction: EntitiesAction<EntityType>
  readonly upsertEntitiesAction: EntitiesAction<EntityType>
  readonly updateEntityAction: UpdateEntityAction<EntityType>
  readonly updateEntitiesAction: UpdateEntitiesAction<EntityType>
  readonly mapEntityAction: EntityMapAction<EntityType>
  readonly mapEntitiesAction: EntitiesMapAction<EntityType>
  readonly deleteEntityAction: DeleteEntityAction<EntityType>
  readonly deleteEntitiesAction: DeleteEntitiesAction<EntityType>
  readonly deleteEntitiesByPredicateAction: DeleteEntitiesByPredicateAction<EntityType>
  readonly clearEntitiesAction: ClearEntitiesAction<EntityType>

  readonly actionReducer: ActionReducer<EntityStateExtra<EntityType>>
  readonly reducers: EntityReducer<EntityType>[]
  readonly onUpdateEntityAction: EntityReducer<EntityType>
  readonly onSetEntityAction: EntityReducer<EntityType>
  readonly onAddEntityAction: EntityReducer<EntityType>

  onSetEntitiesAction: EntityReducer<EntityType>

  onUpsertEntityAction: EntityReducer<EntityType>
  onAddEntitiesAction: EntityReducer<EntityType>

  onUpsertEntitiesAction: EntityReducer<EntityType>

  onUpdateEntitiesAction: EntityReducer<EntityType>

  onMapEntityAction: EntityReducer<EntityType>

  onMapEntitiesAction: EntityReducer<EntityType>

  onDeleteEntityAction: EntityReducer<EntityType>

  onDeleteEntitiesAction: EntityReducer<EntityType>

  onDeleteEntitiesByPredicateAction: EntityReducer<EntityType>

  onLoadEntitiesAction: EntityReducer<EntityType>

  onClearEntitiesAction: EntityReducer<EntityType>

  readonly adapter: EntityAdapter<EntityType>
  readonly initialState: EntityStateExtra<EntityType>

  readonly selectIds: SelectIds

  readonly selectEntities: SelectEntities<EntityType>

  readonly selectAllEntity: SelectAllEntity<EntityType>
  readonly selectEntity: SelectEntity<EntityType>

  get selectedEntityId (): SelectEntityId;

  get selectState (): SelectState<EntityType>

  getEntry (): EntityEntry<F>

  getFeatureName (): EntityFeatureName<F>
}

export enum EntityActionLabelEnum {
  LoadEntities = 'LOAD_ENTITIES',
  SetEntities = 'SET_ENTITIES',
  AddEntity = 'ADD_ENTITY',
  SetEntity = 'SET_ENTITY',
  UpsertEntity = 'UPSERT_ENTITY',
  AddEntities = 'ADD_ENTITIES',
  UpsertEntities = 'UPSERT_ENTITIES',
  UpdateEntity = 'UPDATE_ENTITY',
  UpdateEntities = 'UPDATE_ENTITIES',
  MapEntity = 'MAP_ENTITY',
  MapEntities = 'MAP_ENTITIES',
  DeleteEntity = 'DELETE_ENTITY',
  DeleteEntities = 'DELETE_ENTITIES',
  DeleteEntitiesByPredicate = 'DELETE_ENTITIES_BY_PREDICATE',
  ClearEntities = 'CLEAR_ENTITIES',
}

export type EntityExtra = {
  isLoading?: boolean
  isLoaded?: boolean
}

export type EntityType = { $extra: EntityExtra }

export abstract class EntityStore<EntityFeature extends EntityFeatureNameEnum, E extends EntityType> implements EntityStoreContract<EntityFeature, E> {
  readonly selectId?: IdSelector<E>;
  readonly sortComparer?: false | Comparer<E>;
  readonly adapter = createEntityAdapter<E>({
    selectId: this.selectId,
    sortComparer: this.sortComparer,
  });

  readonly initialState: EntityStateExtra<E> = this.adapter.getInitialState({
    ids: [],
    entities: [],
    selectedEntityId: null
  });

  readonly getActionType = (text: string): string => `[${this.getEntry()}] - ${startCase(text.toLowerCase())}`

  readonly loadEntitiesAction = createAction(this.getActionType(EntityActionLabelEnum.LoadEntities), props<{ entities: E[] }>());
  readonly setEntitiesAction = createAction(this.getActionType(EntityActionLabelEnum.SetEntities), props<{ entities: E[] }>());
  readonly addEntityAction = createAction(this.getActionType(EntityActionLabelEnum.AddEntity), props<{ entity: E }>());
  readonly setEntityAction = createAction(this.getActionType(EntityActionLabelEnum.SetEntity), props<{ entity: E }>());
  readonly upsertEntityAction = createAction(this.getActionType(EntityActionLabelEnum.UpsertEntity), props<{ entity: E }>());
  readonly addEntitiesAction = createAction(this.getActionType(EntityActionLabelEnum.AddEntities), props<{ entities: E[] }>());
  readonly upsertEntitiesAction = createAction(this.getActionType(EntityActionLabelEnum.UpsertEntities), props<{ entities: E[] }>());
  readonly updateEntityAction = createAction(this.getActionType(EntityActionLabelEnum.UpdateEntity), props<{ update: Update<E> }>());
  readonly updateEntitiesAction = createAction(this.getActionType(EntityActionLabelEnum.UpdateEntities), props<{ updates: Update<E>[] }>());
  readonly mapEntityAction = createAction(this.getActionType(EntityActionLabelEnum.MapEntity), props<{ entityMap: EntityMapOne<E> }>());
  readonly mapEntitiesAction = createAction(this.getActionType(EntityActionLabelEnum.MapEntities), props<{ entityMap: EntityMap<E> }>());
  readonly deleteEntityAction = createAction(this.getActionType(EntityActionLabelEnum.DeleteEntity), props<{ id: string }>());
  readonly deleteEntitiesAction = createAction(this.getActionType(EntityActionLabelEnum.DeleteEntities), props<{ ids: string[] }>());
  readonly deleteEntitiesByPredicateAction = createAction(this.getActionType(EntityActionLabelEnum.DeleteEntitiesByPredicate), props<{ predicate: Predicate<E> }>());
  readonly clearEntitiesAction = createAction(this.getActionType(EntityActionLabelEnum.ClearEntities));

  onUpdateEntityAction = on(this.updateEntityAction, (state: EntityStateExtra<E>, {update}) => {
    return this.adapter.updateOne(update, state);
  })
  onAddEntityAction = on(this.addEntityAction, (state: EntityStateExtra<E>, {entity}) => {
    return this.adapter.addOne(entity, state);
  })

  onSetEntityAction = on(this.setEntityAction, (state: EntityStateExtra<E>, {entity}) => {
    return this.adapter.setOne(entity, state);
  })

  onSetEntitiesAction = on(this.setEntitiesAction, (state: EntityStateExtra<E>, {entities}) => {
    return this.adapter.setMany(entities, state);
  })

  onUpsertEntityAction = on(this.upsertEntityAction, (state: EntityStateExtra<E>, {entity}) => {
    return this.adapter.upsertOne(entity, state);
  })

  onAddEntitiesAction = on(this.addEntitiesAction, (state: EntityStateExtra<E>, {entities}) => {
    return this.adapter.addMany(entities, state);
  })

  onUpsertEntitiesAction = on(this.upsertEntitiesAction, (state: EntityStateExtra<E>, {entities}) => {
    return this.adapter.upsertMany(entities, state);
  })

  onUpdateEntitiesAction = on(this.updateEntitiesAction, (state: EntityStateExtra<E>, {updates}) => {
    return this.adapter.updateMany(updates, state);
  })

  onMapEntityAction = on(this.mapEntityAction, (state: EntityStateExtra<E>, {entityMap}) => {
    return this.adapter.mapOne(entityMap, state);
  })

  onMapEntitiesAction = on(this.mapEntitiesAction, (state: EntityStateExtra<E>, {entityMap}) => {
    return this.adapter.map(entityMap, state);
  })

  onDeleteEntityAction = on(this.deleteEntityAction, (state: EntityStateExtra<E>, {id}) => {
    return this.adapter.removeOne(id, state);
  })

  onDeleteEntitiesAction = on(this.deleteEntitiesAction, (state: EntityStateExtra<E>, {ids}) => {
    return this.adapter.removeMany(ids, state);
  })

  onDeleteEntitiesByPredicateAction = on(this.deleteEntitiesByPredicateAction, (state: EntityStateExtra<E>, {predicate}) => {
    return this.adapter.removeMany(predicate, state);
  })

  onLoadEntitiesAction = on(this.loadEntitiesAction, (state: EntityStateExtra<E>, {entities}) => {
    return this.adapter.setAll(entities, state);
  })

  onClearEntitiesAction = on(this.clearEntitiesAction, (state: EntityStateExtra<E>) => {
    return this.adapter.removeAll({...state, selectedEntityId: null} as EntityStateExtra<E>);
  })

  readonly reducers: ReducerTypes<EntityStateExtra<E>, readonly ActionCreator[]>[] = [
    this.onAddEntityAction,
    this.onSetEntityAction,
    this.onSetEntitiesAction,
    this.onUpsertEntityAction,
    this.onAddEntitiesAction,
    this.onUpsertEntitiesAction,
    this.onUpdateEntityAction,
    this.onUpdateEntitiesAction,
    this.onMapEntityAction,
    this.onMapEntitiesAction,
    this.onDeleteEntityAction,
    this.onDeleteEntitiesAction,
    this.onDeleteEntitiesByPredicateAction,
    this.onLoadEntitiesAction,
    this.onClearEntitiesAction
  ]

  readonly actionReducer = createReducer<EntityStateExtra<E>>(
    this.initialState,
    ...this.reducers
  );

  readonly feature = createFeature({
    name: this.getFeatureName(),
    reducer: this.actionReducer,
  });

  readonly selectAllEntity = createSelector(
    this.selectIds,
    this.selectEntities,
    (ids: string[], entities: Dictionary<E>) => ids.map((id) => entities[id]),
  );

  readonly selectEntity = (id: string) => createSelector(
    this.selectEntities,
    (entities: Dictionary<E>) => entities[id],
  );

  readonly selectEntitiesByIds = (ids: string[]) => createSelector(
    this.selectEntities,
    (entities: Dictionary<E>) => ids.map(id => entities[id]) as E[],
  )

  get selectEntities (): SelectEntities<E> {
    return this.feature.selectEntities
  }

  get selectIds (): SelectIds {
    return this.feature.selectIds
  }

  get selectedEntityId (): SelectEntityId {
    return this.feature.selectSelectedEntityId
  }

  abstract get selectState (): SelectState<E>;

  abstract getEntry (): EntityEntry<EntityFeature>

  abstract getFeatureName (): EntityFeatureName<EntityFeature>
}
