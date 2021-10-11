<template >
  <div>
    <h1>Home3</h1>
    <router-link to="home4">切换到 Home4</router-link>
  </div>
</template>
<script>
import { mapGetters, mapState, mapActions } from "vuex"
export default {
  data() {
    return {

    }
  },
  computed: {
    ...mapState(['text']),
    ...mapGetters(['getText'])
  },
  created() {
    //测试 asycn/await(ES6+)语法是否支持
    this.test()
    const a = 1
    throw 123
    //测试环境全局变量
    console.log('BASE_URL:', process.env.BASE_URL)
  },
  methods: {
    ...mapActions(['setText']),
    async test() {
      const a = await this.test1()
    },
    async test1() {
      return 123
    }
  }
}
</script>

<style lang="less" scoped>
.test {
  color: rgb(199, 145, 78);
}
</style>