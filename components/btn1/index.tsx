import { defineComponent, App } from 'vue';
// import PageContent from './content';

const Btn1 = defineComponent({
  name: 'btn1',
  props: {},

  data() {
    return {}
  },

  render() {
    return (
    <button className="btn1">
      {this.$slots?.default({})}
    </button>);
  },

  methods: {
    
  }
});

Btn1.install = function(app: App) {
  app.component(Btn1.name, Btn1);
  return app;
};

export default Btn1;
