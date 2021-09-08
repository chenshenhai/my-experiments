import { defineComponent, App } from 'vue';
// import PageContent from './content';

const Btn2 = defineComponent({
  name: 'my-btn2',
  props: {},

  data() {
    return {}
  },

  render() {
    return (<button className="my-btn2">
      {this.$slots}
    </button>);
  },

  methods: {
    
  }
});

Btn2.install = function(app: App) {
  app.component(Btn2.name, Btn2);
  return app;
};

export default Btn2;

