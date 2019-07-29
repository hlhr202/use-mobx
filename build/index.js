"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
function store(storeConstructor) {
    Object.defineProperties(storeConstructor, {
        instance: {
            get: function () {
                if (!storeConstructor._instance) {
                    storeConstructor._instance = new storeConstructor();
                }
                return storeConstructor._instance;
            },
            set: function () { },
            enumerable: true,
            configurable: true,
        },
    });
    return storeConstructor;
}
exports.store = store;
function instantiate(storeConstructor) {
    return storeConstructor.instance;
}
exports.instantiate = instantiate;
exports.inject = function (target, propertyKey) {
    var instance = instantiate(Reflect.getMetadata('design:type', target, propertyKey));
    Object.defineProperty(target, propertyKey, {
        get: function () { return instance; },
        set: function () { },
        enumerable: true,
        configurable: true,
    });
};
//# sourceMappingURL=index.js.map