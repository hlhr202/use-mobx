import 'reflect-metadata';
export interface IDecoratedConstructor<T> {
    new (...args: any[]): T;
    _instance?: T;
    instance?: T;
}
export declare function store<T>(storeConstructor: IDecoratedConstructor<T>): IDecoratedConstructor<T>;
export declare function instantiate<T>(storeConstructor: IDecoratedConstructor<T>): NonNullable<T>;
export declare const inject: PropertyDecorator;
//# sourceMappingURL=index.d.ts.map