import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { EntityMap, EntityMapOne, Predicate, Update } from "@ngrx/entity";
import { EntityType, EntityFeatureNameEnum, EntityStore } from "@store/entity.store";

export interface EntityServiceContract<T> {
  find$ (id: string): Observable<T>

  dispatchSetEntities (data: T[]): void

  dispatchLoadEntitiesAction (data: T[]): void

  dispatchAddEntityAction (entity: T): void

  dispatchSetEntityAction (entity: T): void

  dispatchUpsertEntityAction (entity: T): void

  dispatchAddEntitiesAction (entities: T[]): void

  dispatchUpsertEntitiesAction (entities: T[]): void

  dispatchUpdateEntityAction (update: Update<T>): void

  dispatchUpdateEntitiesAction (updates: Update<T>[]): void

  dispatchMapEntityAction (entityMap: EntityMapOne<T>): void

  dispatchMapEntitiesAction (entityMap: EntityMap<T>): void

  dispatchDeleteEntityAction (id: string): void

  dispatchDeleteEntitiesAction (ids: string[]): void

  dispatchDeleteEntitiesByPredicateAction (predicate: Predicate<T>): void

  dispatchClearEntitiesAction (): void
}

export abstract class EntityService<
  EntityFeature extends EntityFeatureNameEnum,
  T extends EntityType,
> implements EntityServiceContract<T> {

  readonly entities$: Observable<T[]> = this.store.pipe(
    select(this.entityStore.selectAllEntity),
  );

  protected constructor (
    protected readonly store: Store,
    protected readonly entityStore: EntityStore<EntityFeature, T>
  ) {
  }

  find$ (id: string): Observable<T> {
    return this.store.pipe(
      select(this.entityStore.selectEntity(id)),
    );
  }

  getByIds$ (ids: string[], keepDuplicate: boolean = true): Observable<T[]> {
    const searchIds = !keepDuplicate ? [...new Set(ids)] : ids

    return this.store.pipe(
      select(this.entityStore.selectEntitiesByIds(searchIds)),
    );
  }

  dispatchSetEntities (entities: T[]): void {
    this.store.dispatch(this.entityStore.setEntitiesAction({entities}))
  }

  dispatchLoadEntitiesAction (entities: T[]): void {
    this.store.dispatch(this.entityStore.loadEntitiesAction({entities}))
  }

  dispatchAddEntityAction (entity: T): void {
    this.store.dispatch(this.entityStore.setEntityAction({entity}))
  }

  dispatchSetEntityAction (entity: T): void {
    this.store.dispatch(this.entityStore.setEntityAction({entity}))
  }

  dispatchUpsertEntityAction (entity: T): void {
    this.store.dispatch(this.entityStore.upsertEntityAction({entity}))
  }

  dispatchAddEntitiesAction (entities: T[]): void {
    this.store.dispatch(this.entityStore.addEntitiesAction({entities}))
  }

  dispatchUpsertEntitiesAction (entities: T[]): void {
    this.store.dispatch(this.entityStore.upsertEntitiesAction({entities}))
  }

  dispatchUpdateEntityAction (update: Update<T>): void {
    this.store.dispatch(this.entityStore.updateEntityAction({update}))
  }

  dispatchUpdateEntitiesAction (updates: Update<T>[]): void {
    this.store.dispatch(this.entityStore.updateEntitiesAction({updates}))
  }

  dispatchMapEntityAction (entityMap: EntityMapOne<T>): void {
    this.store.dispatch(this.entityStore.mapEntityAction({entityMap}))
  }

  dispatchMapEntitiesAction (entityMap: EntityMap<T>): void {
    this.store.dispatch(this.entityStore.mapEntitiesAction({entityMap}))
  }

  dispatchDeleteEntityAction (id: string): void {
    this.store.dispatch(this.entityStore.deleteEntityAction({id}))
  }

  dispatchDeleteEntitiesAction (ids: string[]): void {
    this.store.dispatch(this.entityStore.deleteEntitiesAction({ids}))
  }

  dispatchDeleteEntitiesByPredicateAction (predicate: Predicate<T>): void {
    this.store.dispatch(this.entityStore.deleteEntitiesByPredicateAction({predicate}))
  }

  dispatchClearEntitiesAction (): void {
    this.store.dispatch(this.entityStore.clearEntitiesAction())
  }
}
