<template>
	<div class="seller-wrapper">
		<div class="brief-info">
			<div class="name-star">
				<div class="name">{{seller.name}}</div>
				<div class="star-wrapper">
					<div class="star">
						<star :size="36" :score="seller.score"></star>
					</div>
					<div class="rating-count">({{seller.ratingCount}})</div>
					<div class="sell-count">月售{{seller.sellCount}}单</div>
				</div>
				<div class="collect" @click="collectFlag=!collectFlag">
					<span class="icon-favorite" :class="{active:collectFlag}"></span>
					<span class="text">{{collectFlag?'已收藏':'收藏'}}</span>
				</div>
			</div>
			<div class="price">
				<div class="delivery">
					<span class="title">起送价</span>
					<span class="value">
						<span class="number">{{seller.minPrice}}</span>元
					</span>
				</div>
				<div class="delivery">
					<span class="title">商家配送</span>
					<span class="value">
						<span class="number">{{seller.deliveryPrice}}</span>元
					</span>
				</div>
				<div class="delivery">
					<span class="title">平均配送时间</span>
					<span class="value">
						<span class="number">{{seller.deliveryTime}}</span>分钟
					</span>
				</div>
			</div>
		</div>
		<div class="divider"></div>
		<div class="bulletin-supports">
			<div class="bulletin">
				<h1>公告与活动</h1>
				<div class="text">
					{{seller.bulletin}}
				</div>
			</div>
			<div class="supports-wrapper" v-if="seller.supports">
				<div class=item v-for="item in seller.supports">
					<span class="icon" :class="iconClassMap[item.type]"></span>
					<span class="text">{{item.description}}</span>
				</div>
			</div>
		</div>
		<div class="divider"></div>
		<div class="outdoor-scene">
			<h1>商家实景</h1>
			<div class="img-wrapper">
				<img v-for="pic in seller.pics" :src="pic" width="120" height="90">
			</div>
		</div>
		<div class="divider"></div>
		<div class="seller-info">
			<h1>商家信息</h1>
			<ul class="info-wrapper">
				<li class="info" v-for="info in seller.infos">
					{{info}}
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
	import star from '../star/star'
	export default{
		data(){
			return {
				seller:{},
				collectFlag:false
			}
		},
		created(){
			this.iconClassMap=['decrease','discount','special','invoice','guarantee']
			axios.get("static/data.json").then((res)=>{
				this.seller=res.data.seller
			})
		},
		components:{
			star
		}
	}
</script>
<style lang="stylus">
@import 'seller'
</style>