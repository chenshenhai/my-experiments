import { defineComponent, App } from 'vue';
// import PageContent from './content';

const Btn1 = defineComponent({
  name: 'my-btn1',
  props: {},

  data() {
    return {}
  },

  render() {
    return (<button className="my-btn1">
      {this.$slots}
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
