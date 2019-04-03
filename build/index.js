"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
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
        context: {
            get: function () {
                if (!storeConstructor._context) {
                    storeConstructor._context = React.createContext(storeConstructor.instance);
                }
                return storeConstructor._context;
            },
            set: function () { },
            enumerable: true,
            configurable: true,
        },
    });
    return storeConstructor;
}
exports.store = store;
function useStore(storeConstructor) {
    return React.useContext(storeConstructor.context);
}
exports.useStore = useStore;
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