export default {
  name: 'ProxyComponent',
  props: {
    tag: {
      type: String,
      default: 'div',
    },
  },
  mounted() {
    this.$el.remove();
    document.body.appendChild(this.$el);
  },
  render(h) {
    return h(this.tag, [this.$slots.default]);
  },
  beforeDestroy() {
    this.$el.remove();
  },
};
