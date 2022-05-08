<template>
  <div class="box">
    <button class="btn" @click="onClick">Add</button>
    <span class="text">Count: {{state.count}}</span>
  </div>
</template>

<script setup lang="ts">
  import { reactive } from 'vue';
  const state = reactive<{count: number}>({
    count: 0
  });
  const onClick = () => {
    state.count ++;
  }
</script>

<style lang="less">

.box {
  width: 200px;
  padding: 10px;
  margin: 0 auto;
  border: 1px solid #999999;
}
.btn {
  height: 32px;
  background: #2784ee;
  color: #ffffff;
  font-size: 18px;
  border: none;
}
.text {
  font-size: 20px;
  font-weight: bold;
  color: #666666;
  margin: 0 10px;
}
</style>


