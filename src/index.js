import defaultVue from 'vue';
import container from './container';
import ProxyComponent from './ProxyComponent';

container.Vue = defaultVue;

// 導入方法1
// vuex または vuerouter を使ってるなら、store と routerをoptionに渡してあげてください
// import ProxyComponent from 'vue-proxy-component';
// Vue.use(ProxyComponent, { store, router });
// 理由
// proxycomponent の slot に来る component の Vue インスタンスと、あなたがプロジェクトで使っている Vue インスタンスは異なります
// あなたのプロジェクトのVueインスタンスは
// new Vue({ el: '#app', store, router });
// で初期化され、this.$store や this.$router が使えますが、こちらのVueインスタンスにはそれらがないためです

// 導入方法2
// import ProxyComponent from 'vue-proxy-component';
// Vue.use(ProxyComponent);
export default {
  install(Vue, baseOptions = null) {
    container.Vue = Vue;

    if (typeof baseOptions === 'object') {
      const options = Object.assign({}, baseOptions);
      // nameが指定されてたら、その名前でVueコンポーネントを登録する
      if ('name' in options) {
        Vue.component(options.name, ProxyComponent);
        delete options.name;
      } else {
        Vue.component(ProxyComponent.name, ProxyComponent);
      }
      Object.keys(options).forEach(key => {
        container.options[key] = options[key];
      });
    }
  },
};

// そのままでも使えるよ！
// 導入方法3
// import { ProxyComponent } from 'vue-proxy-component';
// Vue.component('好きな名前', ProxyComponent);
export { ProxyComponent };
