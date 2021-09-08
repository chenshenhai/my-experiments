<template>
  <div>
    <btn1>Hello Btn1</btn1>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import Btn1 from './../components/btn1/index';

export default defineComponent({
  components: {
    Btn1,
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

 
</style>
