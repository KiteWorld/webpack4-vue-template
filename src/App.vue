<template>
  <div>
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: '测试vue'
    }
  },
  methods: {}
}
</script>

<style lang="less" scoped>
.text {
  color: red;
}
</style>