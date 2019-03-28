import { store, instantiate, useStore } from '../lib';
import { observable, action } from 'mobx';
import { useObserver } from 'mobx-react-lite';
import React from 'react';
import { act } from 'react-dom/test-utils';
import ReactDOM from 'react-dom';

@store
class TestStore {
    @observable testData = '1';
    @action changeTestData = () => {
        this.testData === '1' ? (this.testData = '2') : (this.testData = '1');
    };
}

describe('Test singleton', () => {
    it('Created singleton instance', () => {
        const instance = instantiate(TestStore);
        expect(TestStore).toHaveProperty('instance', instance);
    });

    it('Has singleton instance', () => {
        const instance1 = instantiate(TestStore);
        const instance2 = instantiate(TestStore);
        expect(instance1).toBe(instance2);
    });

    it('Create singleton context', () => {
        const context = (TestStore as any).context;
        expect(context).toBe((TestStore as any)._context);
    });

    it('Can be used as singleton context', () => {
        function Component1() {
            const store = useStore(TestStore);
            return useObserver(() => (
                <>
                    <div>{store.testData}</div>
                    <button onClick={store.changeTestData}>change</button>
                </>
            ));
        }

        function Component2() {
            const store = useStore(TestStore);
            return useObserver(() => (
                <>
                    <div>{store.testData}</div>
                    <button onClick={store.changeTestData}>change</button>
                </>
            ));
        }

        const container1 = document.createElement('div');
        const container2 = document.createElement('div');
        act(() => {
            ReactDOM.render(<Component1 />, container1);
            ReactDOM.render(<Component2 />, container2);
        });

        const button1 = container1.querySelector('button');
        act(() => {
            button1!.click();
        });
        setTimeout(() => {
            const data1 = container1.querySelector('div')!.textContent;
            const data2 = container2.querySelector('div')!.textContent;
            expect(data1).toEqual(data2);
        }, 0);
    });
});
