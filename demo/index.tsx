import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { observable, action, observe, computed } from 'mobx';
import { useObserver } from 'mobx-react-lite';
import { instantiate, inject } from '../lib';

class GlobalStore2 {
    // This will be constructed as singleton
    @observable test2 = '2';
    @action changeTest2 = () => {
        this.test2 = this.test2 === '2' ? '1' : '2';
    };
}

class GlobalStore1 {
    // This will be constructed as singleton
    @observable test = '1';
    @action changeTest1 = () => {
        this.test = this.test === '1' ? '2' : '1';
    };
    @inject store2!: GlobalStore2; // Injected will be singleton as well
    @computed get testTotal() {
        return this.test + this.store2.test2;
    }
}

function Root3() {
    const store2 = instantiate(GlobalStore2);
    return useObserver(() => (
        <>
            <div>{store2.test2}</div>
            <button onClick={store2.changeTest2}>Change</button>
        </>
    ));
}

function Root2() {
    const store = instantiate(GlobalStore1);
    return useObserver(() => (
        <>
            <div>{store.test}</div>
            <button onClick={store.changeTest1}>Change</button>
        </>
    ));
}

function useWatchStore1Change() {
    const store = instantiate(GlobalStore1);
    React.useEffect(() => {
        const dispose = observe(store, 'test', change => {
            if (change.type === 'update') {
                store.store2.changeTest2();
            }
        });
        return () => dispose();
    }, [store]);
}

function Root() {
    useWatchStore1Change();
    const store = instantiate(GlobalStore1);
    return useObserver(() => (
        <>
            <div>{store.store2.test2}</div>
            <button onClick={store.store2.changeTest2}>Change</button>
            <Root2 />
            <Root3 />
            <div>test total {store.testTotal}</div>
        </>
    ));
}

ReactDOM.render(<Root />, document.getElementById('root'));
