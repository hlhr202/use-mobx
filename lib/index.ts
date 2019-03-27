import * as React from "react";
import "reflect-metadata";

export interface IDecoratedConstructor<T> {
  new (...args: any[]): T;
  _instance?: T;
  _context?: React.Context<T | undefined>;
  instance?: T;
  context?: React.Context<T>;
}

export function store<T>(storeConstructor: IDecoratedConstructor<T>) {
  Object.defineProperties(storeConstructor, {
    instance: {
      get: () => {
        if (!storeConstructor._instance) {
          storeConstructor._instance = new storeConstructor();
        }
        return storeConstructor._instance;
      },
      set: () => {},
      enumerable: true,
      configurable: true
    },
    context: {
      get: () => {
        if (!storeConstructor._context) {
          storeConstructor._context = React.createContext(
            storeConstructor.instance
          );
        }
        return storeConstructor._context;
      },
      set: () => {},
      enumerable: true,
      configurable: true
    }
  });
  return storeConstructor;
}

export function useStore<T>(storeConstructor: IDecoratedConstructor<T>) {
  return React.useContext(storeConstructor.context!);
}

export function instantiate<T>(storeConstructor: IDecoratedConstructor<T>) {
  return storeConstructor.instance!;
}

export const inject: PropertyDecorator = (target, propertyKey) => {
  const instance = instantiate(
    Reflect.getMetadata("design:type", target, propertyKey)
  );
  Object.defineProperty(target, propertyKey, {
    get: () => instance,
    set: () => {},
    enumerable: true,
    configurable: true
  });
};
