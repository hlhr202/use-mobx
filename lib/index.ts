import 'reflect-metadata';

export interface ISingletonConstructor<T> {
    new (...args: any): T;
    _$$instance?: T;
    // $$instance?: T;
}

// export function store<T>(storeConstructor: IDecoratedConstructor<T>) {
//     Object.defineProperties(storeConstructor, {
//         $$instance: {
//             get: () => {
//                 if (!storeConstructor._$$instance) {
//                     storeConstructor._$$instance = new storeConstructor();
//                 }
//                 return storeConstructor._$$instance;
//             },
//             set: () => {},
//             enumerable: true,
//             configurable: true,
//         },
//     });
//     return storeConstructor;
// }

export function instantiate<T>(
    storeConstructor: ISingletonConstructor<T>,
    ...args: any[]
) {
    const isServer = typeof window === 'undefined';
    if (isServer) {
        return new storeConstructor(...args);
    } else {
        if (!storeConstructor._$$instance) {
            storeConstructor._$$instance = new storeConstructor(...args);
        }
        return storeConstructor._$$instance!;
    }
}

export const inject: PropertyDecorator = (target, propertyKey) => {
    const instance = instantiate(
        Reflect.getMetadata('design:type', target, propertyKey),
    );
    Object.defineProperty(target, propertyKey, {
        get: () => instance,
        set: () => {},
        enumerable: true,
        configurable: true,
    });
};
