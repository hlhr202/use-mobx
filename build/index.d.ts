import * as React from 'react';
import 'reflect-metadata';
export interface IDecoratedConstructor<T> {
    new (...args: any[]): T;
    _instance?: T;
    _context?: React.Context<T | undefined>;
    instance?: T;
    context?: React.Context<T>;
}
export declare function store<T>(storeConstructor: IDecoratedConstructor<T>): IDecoratedConstructor<T>;
export declare function useStore<T>(storeConstructor: IDecoratedConstructor<T>): T;
export declare function instantiate<T>(storeConstructor: IDecoratedConstructor<T>): NonNullable<T>;
export declare const inject: PropertyDecorator;
//# sourceMappingURL=index.d.ts.map