# vue-proxy-component
## インストール方法
npm

```
$ npm install vue-proxy-component
```

yarn

```
$ yarn add vue-proxy-component
```

```
import ProxyComponent from 'vue-proxy-component';

Vue.component('ProxyComponent', ProxyComponent);
```

## 特徴
ProxyComponent内にマークアップすると、リバースプロキシのようにリアクティブに要素を操作できる。

## 主な使い方
ProxyComponent内にモーダルをマークアップしたりすると、モーダルの順番管理や、親要素のcssの影響などを一切受けずに、安心して使える

```
<ProxyComponent>
  <SomeComponent @click="$emit('hello')" :hoge="fuga">
</ProxyComponent>
```
