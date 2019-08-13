<template>
  <div class="header">
    <div class="name-wrapper">
    	<div class="avatar">
    		<img :src="seller.avatar" width="64" height="64">
    	</div>
    	<div class="info-content">
    		<div class="title">
    			<span class="brand"></span>
    			<span class="name">{{seller.name}}</span>
    		</div>
    		<div class="delivery">
    			{{seller.description}}/{{seller.deliveryTime}}分钟送达
    		</div>
    		<div class="supports" v-if="seller.supports">
    			<span class="icon" :class="iconClassMap[seller.supports[0].type]"></span>
    			<span class="text">{{seller.supports[0].description}}</span>
    		</div>
    	</div>
    	<!-- 点击显示详细内容 -->
    	<div class="support-count" v-if="seller.supports" @click="showDetail()">
    		<span class="count">{{supportsNumber}}个</span>
    		<i class="icon-keyboard_arrow_right"></i>
    	</div>
    </div>
    <!-- 点击显示详细内容 -->
	<div class="bulletin-wrapper" @click="showDetail()">
		<span class="bulletin-title"></span>
		<span class="bulletin-text">{{seller.bulletin}}</span>
		<i class="icon-keyboard_arrow_right"></i>
	</div>
    <div class="background">
    	<img :src="seller.avatar" width="100%" height="100%">
    </div>
    <!-- 点击显示详细内容 -->
    <transition name="fade">
    	<div class="detail" v-if="detailShow">
    		<div class="detail-content">
    			<!-- 店名和评星 -->
	    		<div class="name-star">
	    			<h1 class="name">{{seller.name}}</h1>
	    			<div class="star">
	    				<star :size="48" :score="seller.score"></star>
	    			</div>
	    		</div>
	    		<!-- 优惠信息 -->
	    		<div class="title">
	    				<span class="line"></span>
	    				<span class="text">优惠信息</span>
	    				<span class="line"></span>
	    			</div>
	    		<div class="supports" v-if="seller.supports">
	    			
	    			<div class="support-item" v-for="(item,index) in seller.supports" v-bind:key="index">
	    				<span class="icon" :class="iconClassMap[item.type]"></span>
	    				<span class="text">{{item.description}}</span>
	    			</div>
	    		</div>
	    		<!-- 商家公告 -->
	    		<div class="title">
	    				<span class="line"></span>
	    				<span class="text">商家公告</span>
	    				<span class="line"></span>
	    			</div>
	    		<div class="seller-bulletin">
					{{seller.bulletin}}
	    		</div>
	    	</div>
	    	<!-- 关闭显示 -->
	    	<div class="detail-close">
	    		<i class="icon-close" @click="hideDetail()"></i>
	    	</div>
    	</div>
    </transition>
  </div>
</template>

<script>
	import star from "../star/star"
	export default {
		data(){
			return {
				detailShow:false
			}
		},
		props:{
			seller:Object
		},
		created(){
			this.iconClassMap=['decrease','discount','special','invoice','guarantee']
		},
		computed:{
			//计算优惠活动个数
			supportsNumber(){
				return this.seller.supports.length
			}
		},
		methods:{
			showDetail(){
				this.detailShow=true
			},
			hideDetail(){
				this.detailShow=false
			}
		},
		components:{
			star
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
// 引入stylus样式
@import 'header'
</style>
