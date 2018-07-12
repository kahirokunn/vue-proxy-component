import container from './container';

// アルゴリズム
// 1. 描画先Vueインスタンスの仕組み
// beforeCreateでVueインスタンスを作成。
// そのVueインスタンスのrender関数は自身のdataに定義されているnode変数をただ返却するだけ。
// そのVueインスタンスはそのnode変数が変更された際に再描画される。
//
// 2. リアクティブマジック
// 2-1. イベント伝搬
// その描画先Vueインスタンスのnode変数に自身が持つスロットに入ってくるnodeを入れる
// そのnodeには親コンポーネントが登録したリスナー等やprops等の参照が入っているので、イベント伝搬はできる
// 2-2. 再描画
// Vue.jsの2.5時点での差分描画アルゴリズムでは、古いNodeとrender関数が発行した新しいNodeを比較して、差分を埋める
// endPointVmのnodeはobserverで変更があるとrender関数が再度実行される
// そのnodeに対して、自身のslotに入ってくるnodeを同期させれば、slotとendPointVmの描画結果の同期が可能になる
// 2-3. 同期
// slotのVnodeに変更があった際にどうやってendPointVmに変更後のVnodeを同期すればよいのか、という問題に関しての解説
// slot内の要素に更新があった場合、そのslotをラップしているコンポーネントのrenderは再実行され、updateライフサイクルも呼ばれる。
// renderが再実行される際に、observerではないendpointVm.nodeに自身の最新のslotのVnode、this.$slots.defaultを代入することにより、同期が取れる。
// 3. フロー
// 1. observerじゃないthis.endPointVmにただnode propを表示するだけのコンポーネントを作成
// 2. そのnode propをProxyComponentの再描画のタイミングで、同期させる

const ProxyComponentEndPointOptions = {
  data: () => ({ node: '' }),

  render(h) {
    return this.node;
  },
};

export default {
  name: 'ProxyComponent',

  props: {
    tag: {
      type: String,
      default: 'div',
    },
  },

  beforeCreate() {
    this.endPointVm = new container.Vue(Object.assign({}, container.options, ProxyComponentEndPointOptions));
    this.endPointVm.$mount();
  },

  render(h) {
    const startingPointNode = h(this.tag, { attrs: this.$attrs, on: this.$listeners }, this.$slots.default || []);
    this.endPointVm.node = startingPointNode;
  },

  mounted() {
    document.body.appendChild(this.endPointVm.$el);
  },

  beforeDestroy() {
    this.endPointVm.$el.remove();
    this.endPointVm.$destroy();
  },
};
