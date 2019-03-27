import * as React from "react";
import * as ReactDOM from "react-dom";
import { observable, action, observe, computed } from "mobx";
import { useObserver } from "mobx-react-lite";
import { store, useStore, inject } from "./lib";

@store
class GlobalStore2 {
  @observable test2 = "2";
  @action fuckThis2 = () => {
    this.test2 = this.test2 === "2" ? "1" : "2";
  };
}

@store
class GlobalStore {
  @observable test = "1";
  @action fuckThis = () => {
    this.test = this.test === "1" ? "2" : "1";
  };
  @inject store2!: GlobalStore2;
  @computed get testTotal() {
    return this.test + this.store2.test2;
  }
}

function Root3() {
  const store2 = useStore(GlobalStore2);
  return useObserver(() => (
    <>
      <div>{store2.test2}</div>
      <button onClick={store2.fuckThis2}>fuckThis</button>
    </>
  ));
}

function Root2() {
  const store = useStore(GlobalStore);
  return useObserver(() => (
    <>
      <div>{store.test}</div>
      <button onClick={store.fuckThis}>fuckThis</button>
    </>
  ));
}

function useWatchStore1Change() {
  const store = useStore(GlobalStore);
  React.useEffect(() => {
    const dispose = observe(store, "test", change => {
      if (change.type === "update") {
        store.store2.fuckThis2();
      }
    });
    return () => dispose();
  });
}

function Root() {
  useWatchStore1Change();
  const store = useStore(GlobalStore);
  console.log(store)
  return useObserver(() => (
    <>
      <div>{store.store2.test2}</div>
      <button onClick={store.store2.fuckThis2}>fuckThis</button>
      <Root2 />
      <Root3 />
      <div>test total {store.testTotal}</div>
    </>
  ));
}

ReactDOM.render(<Root />, document.getElementById("root"));
