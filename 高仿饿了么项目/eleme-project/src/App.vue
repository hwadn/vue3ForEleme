<template>
  <div id="app">
    <!-- 头部组件，绑定卖家信息 -->
    <v-header v-bind:seller="seller"></v-header>
  </div>
</template>
<script>
  import header from "./components/header/header"
  import './plugins/axios'
  export default {
    data(){
      return {
        //动态数据
        seller:{}
       
      }
    },
    //实例生成后，但未加入dom前调用
    created(){
      //axios请求数据成功后给实例数据
      axios.get("static/data.json").then((res)=>{
        this.seller=res.data.seller
      })
    },
    components: {
      "v-header":header
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import 'common/stylus/index'
</style>
