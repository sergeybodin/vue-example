<template>
  <select v-model="moduleValue" @change="changeOption">
    <option disabled value="">выбирите что нибудь из списка</option>
    <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
    >
      {{ option.name}}
    </option>
  </select>
</template>

<script>
export default {
  name: 'app-select',
  props: {
    modelValue: {
      type: String
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    changeOption(event){
      this.$emit('update:modelValue', event.target.value);
    }
  }
}
</script>

<style scoped>
select {
  margin: 15px 0;
}
</style>
