<template>
  <div>
    <!-- 头部组件，绑定卖家信息 -->
    <v-header v-bind:seller="seller"></v-header>
    <!-- 主要部分 -->
    <div class="tab">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评价</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
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
.tab
  display flex
  width 100%
  height 40px
  line-height 40px
  border-1px(rgba(7,17,27,0.1))
  .tab-item
    flex 1
    text-align center
    a
      display block
      color rgb(77,85,93)
      font-size 14px
      &.active
        font-size 16px
        color rgb(240,20,20)
</style>
