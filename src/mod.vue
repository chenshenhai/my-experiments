<template>
  <div class="box">
    Hello {{displayText}}!
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {},
  props: {
    text: String,
  },
  data() {
    return {
      displayText: this.text || 'Vue'
    }
  }
})
</script>

<style scoped>
.box {
  font-size: 20px;
  font-weight: bold;
  color: #666666;
}
</style>
