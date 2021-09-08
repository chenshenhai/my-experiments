<template>
  <div>
    <btn1>Hello Btn1</btn1>
  </div>
  <div>
    <btn2>Hello Btn2</btn2>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import Btn1 from './../components/btn1/index';
import Btn2 from './../components/btn2/index';

export default defineComponent({
  components: {
    Btn1,
    Btn2,
  },
  data() {
    return {
      
    };
  },
  methods: {},
});
</script>
<style lang="less">
@import "./../components/btn1/style/index.less";
@import "./../components/btn2/style/index.less";
 
</style>
