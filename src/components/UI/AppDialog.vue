<template>
  <div class="dialog" v-if="show === true" @click.stop="hideDialog">
    <div @click.stop class="dialog__content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import toogleMixin from "@/mixins/toogleMixin";

export default {
  name: 'app-dialog',
  mixins: [toogleMixin]
}
</script>

<style scoped>
.dialog {
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  display: flex;
}

.dialog__content {
  margin: auto;
  background: white;
  border-radius: 12px;
  min-width: 200px;
  min-height: 50px;
  padding: 20px;
}
</style>
