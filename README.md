# vue-proxy-component
## DEMO
https://jsfiddle.net/kahirokunn/09d3upf4

## インストール方法
npm

```
$ npm install vue-proxy-component
```

yarn

```
$ yarn add vue-proxy-component
```

Vuex または、Vue router を使っていた場合

```
import ProxyComponent from 'vue-proxy-component';

Vue.use(ProxyComponent, { store, router });
```

VuexもVue routerも使っていなかった場合

```
import ProxyComponent from 'vue-proxy-component';

Vue.use(ProxyComponent);
```

## 特徴
ProxyComponent内にマークアップすると、リバースプロキシのようにリアクティブに要素を操作できる。

## 主な使い方
ProxyComponent内にモーダルをマークアップしたりすると、モーダルの順番管理や、親要素のcssの影響などを一切受けずに、安心して使える

```
<ProxyComponent>
  <SomeComponent
    @success="$router.push('/hello')"
    @error="$store.dispatch('/hello')"
    @click="$emit('hello')"
    :hoge="fuga">
</ProxyComponent>
```
