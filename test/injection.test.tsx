import { instantiate, inject } from '../lib';
import { observable, action } from 'mobx';
import { useObserver } from 'mobx-react-lite';
import React from 'react';
import { act } from 'react-dom/test-utils';
import ReactDOM from 'react-dom';

class TestStore1 {
    @observable testData = '1';
    @action changeTestData = () => {
        this.testData === '1' ? (this.testData = '2') : (this.testData = '1');
    };
    @action resetAll = () => {
        this.testData = '1';
    };
}

class TestStore2 {
    @observable testData = '1';
    @action changeTestData = () => {
        this.testData === '1' ? (this.testData = '2') : (this.testData = '1');
    };
    @action resetAll = () => {
        this.testData = '1';
    };
    @inject store1!: TestStore1;
}

describe('Test injection', () => {
    beforeEach(() => {
        const store1 = instantiate(TestStore1);
        const store2 = instantiate(TestStore2);
        store1.resetAll();
        store2.resetAll();
    });

    it('Injected as singleton', () => {
        const store1 = instantiate(TestStore1);
        const store2 = instantiate(TestStore2);
        expect(store2.store1).toBe(store1);
    });

    it('Injection reactive properly in functional component', () => {
        function Component() {
            const store2 = instantiate(TestStore2);
            return useObserver(() => (
                <>
                    <button onClick={store2.store1.changeTestData}>Test</button>
                    <div>{store2.store1.testData}</div>
                </>
            ));
        }
        const container = document.createElement('div');
        act(() => {
            ReactDOM.render(<Component />, container);
        });
        expect(container.querySelector('div')!.textContent).toEqual('1');
        const button = container.querySelector('button');
        act(() => {
            button!.click();
        });
        setTimeout(() => {
            expect(instantiate(TestStore1).testData).toEqual('2');
        }, 0);
    });
});
