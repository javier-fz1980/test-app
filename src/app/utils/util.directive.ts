import {
  Directive,
  OnChanges,
  OnDestroy,
  SimpleChange,
  SimpleChanges
} from '@angular/core';

import { Observable, ReplaySubject, Subject } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';

/**
 * A directive from which other components/directives can inherit, that provides some helpers and convenience methods.
 *
 * @example
 * ```ts
 * @Component({ ... })
 * export class MyComponent extends UtilDirective {
 *   constructor() {
 *     super();
 *   }
 * }
 * ```
 */

export type TrackByFunction<Input = unknown> = (
  index: number,
  input: Input
) => unknown;

export interface TypedSimpleChange<Class, Property extends keyof Class>
  extends SimpleChange {
  currentValue: Class[Property];
  previousValue: Class[Property];
}

@Directive()
export abstract class UtilDirective<Subclass = void>
  implements OnChanges, OnDestroy
{
  /**
   * Listens for ngOnChanges
   * Using ReplaySubject because ngOnChanges happens before ngOnInit:
   * If your template has {{ changed$ | async }}, the subscription will be created after the first ngOnChanges has already taken place, and nothing will render.
   * */
  public changed$: Subject<SimpleChanges> = new ReplaySubject(1);

  /** Listens for ngOnDestroy */
  public destroyed$: Subject<boolean> = new Subject();

  private trackByPropnames: {
    [key: string]: TrackByFunction;
  } = {};

  ngOnChanges(changes: SimpleChanges): void {
    this.changed$.next(changes);
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
    this.changed$.complete();
  }

  /**
   * A wrapper around ngOnChanges, for a specific @Input.
   *
   * @example
   * ```ts
   * this.onInputChange('myInput').subscribe({ currentValue, previousValue } => {
   *   // do stuff
   * })
   * ```
   */
  onInputChange<
    T extends Subclass extends void ? this : Subclass,
    K extends keyof T
    >(propertyName: K): Observable<TypedSimpleChange<T, K>> {
    return this.changed$.pipe(
      takeUntil(this.destroyed$),
      filter((changes) => propertyName in changes),
      map((changes) => changes[propertyName as string])
    );
  }

  /**
   * Same as onInputChange, but just returns current value instead of a SimpleChange
   */
  onInputValue<
    T extends Subclass extends void ? this : Subclass,
    K extends keyof T
    >(propertyName: K): Observable<T[K]> {
    // Couldn't get TS to play nice using `.onInputChange` here so just copypasted it
    return this.changed$.pipe(
      takeUntil(this.destroyed$),
      filter((changes) => propertyName in changes),
      map((changes) => changes[propertyName as string].currentValue)
    );
  }

  /**
   * A wrapper around subscribing to an observable that adds takeUntil(this.destroyed) for you. An alternative to this.observable$.pipe(takeUntil(this.destroyed$)).
   *
   * @example
   * ```ts
   * this.getObservablePipe(this.myStore.state$).subscribe((currentState) => {
   *     // do stuff with currentState
   * });
   * ```
   */
  getObservablePipe<State>(state$: Observable<State>): Observable<State> {
    return state$.pipe(takeUntil(this.destroyed$));
  }

  /**
   * Use in templates in *ngFor/trackBy to track by a specific object property.
   *
   * @example
   * ```html
   * <div *ngFor="let user of users; trackBy: trackBy('username')">
   * ```
   */
  trackBy(propname: string): TrackByFunction {
    if (!(propname in this.trackByPropnames)) {
      this.trackByPropnames[propname] = (index, input: any) => {
        return input[propname];
      };
    }
    return this.trackByPropnames[propname];
  }
}
