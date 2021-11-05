import { defineComponent, App } from 'vue';
// import PageContent from './content';

const Btn = defineComponent({
  name: 'btn',
  props: {},
  emits: ['click'],
  setup(props, { slots, emit }) {
    const handleClick = (event) => {
      emit('click', event);
    };
    return () => {
      return (
      <button class="btn" onClick={handleClick}>
        {typeof slots?.default === 'function' ? slots?.default({}) : ''}
      </button>);
    }
  },

  methods: {},
});


Btn.install = function(app) {
  app.component(Btn.name, Btn);
  return app;
};

export default Btn;