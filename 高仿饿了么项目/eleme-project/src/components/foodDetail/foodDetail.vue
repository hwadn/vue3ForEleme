<template>
	<div class="detail-wrapper">
		<div class="header">
			<div class="back" @click="backMenu()">
				<i class="icon-arrow_left"></i>
			</div>
			<div class='pic'>
				<img :src="food.image" width="100%" height="425">
			</div>
			<div class='name'>
				<div class="dish">{{food.name}}</div>
				<div class="sell-info">
					<span class="count">月售{{food.sellCount}}份</span>
					<span class="rating">好评率{{food.rating}}%</span>
				</div>
				<div class="price">
					&#65509;<span class="new-price">{{food.price}}</span>
					<span class="old-price" v-if="food.oldPrice">&#65509;{{food.oldPrice}}</span>
				</div>
				<transition name="fade">
					<div class="cart-plus" @click="foodPlus($event)" v-if="currentCount==0">
						加入购物车
					</div>
				</transition>
				<div class="cart-ctrl">
					<cartCtrl :clickedfood="food" v-show="currentCount>0"></cartCtrl>
				</div>
				
			</div>
		</div>
		<div class="divider"></div>
		<div class="introduction">
			<h1 class="title">商品介绍</h1>
			<span class="text" v-if="food.info">{{food.info}}</span>
		</div>
		<div class="divider"></div>
		<div class="rating">
			<h1 class="title">商品评价</h1>
			<div class="ratings-info">
				<div class="bar">
					<div class="filter">
						<div class="block all" :class="{active:allFlag}" @click="selAll()">全部{{food.ratings.length}}</div>
						<div class="block recommend" :class="{active:recomFlag}" @click="selRecm()">推荐{{recomNumber}}</div>
						<div class="block disclose" :class="{active:discloseFlag}" @click="selDis()">吐槽{{discloseNumber}}</div>
					</div>
					<div class="whether" @click="textFlag=!textFlag">
						<span class="icon-check_circle" :class="{active:textFlag}"></span>只看有内容的评价
					</div>
				</div>
				<div class="contents">
					<ul>
						<li v-for="(rating,index) in ratingsSelect" v-bind:key="index">
							<div class="avatar">
								<div class="time">{{timeTrans(rating.rateTime)}}</div>
								<div class="name">
									{{rating.username}}
									<img :src="rating.avatar" width="12" height="12">
								</div>
								
							</div>
							<div class="rating-text">
								<span class="hand" v-if="!rating.rateType" :class="{up:!rating.rateType}">
									<i class="icon-thumb_up"></i>
								</span>
								<span class="hand" v-if="rating.rateType" :class="{down:rating.rateType}">
									<i class="icon-thumb_down"></i>
								</span>
								<span class="text" v-if="rating.text.length">{{rating.text}}</span>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import cartCtrl from '../cartCtrl/cartCtrl'
	export default{
		data(){
			return {
				// 推荐数
				recomNumber: '',
				// 吐槽数
				discloseNumber:'',
				// 是否有内容
				textFlag:true,
				// 是否全部
				allFlag:true,
				// 是否推荐
				recomFlag:false,
				// 是否吐槽
				discloseFlag:false
			}
		},
		props:{
			food:Object
		},
		created(){
			this.rateNumber()
		},
		computed:{
			// 评论过滤
			ratingsSelect(){
				// 判断数据是否为空
				if(this.food.ratings.length){
					// 显示全部
					if(this.allFlag){
						return this.textFlag?this.food.ratings.filter(rating=>rating.text.length>0):this.food.ratings
					}
					// 显示推荐
					if(this.recomFlag){
						return this.textFlag?(this.food.ratings.filter(rating=>rating.text.length>0)).filter(rating=>rating.rateType==0):this.food.ratings.filter(rating=>rating.rateType==0)
					}
					// 吐槽
					if(this.discloseFlag){
						return this.textFlag?(this.food.ratings.filter(rating=>rating.text.length>0)).filter(rating=>rating.rateType==1):this.food.ratings.filter(rating=>rating.rateType==1)
					}
				}
			},
			// 计算store里的count
			currentCount(){
				let food=this.$store.state.selectedFoods.find((food)=>{
					return food.name==this.food.name
				})
				return food?food.count:0
			}
		},
		methods:{
			backMenu(){
				this.$emit('showMenu')
			},
			// 时间戳转换格式
			timeTrans(time){
				let date = new Date(time)
				let Y = date.getFullYear() + '-'
				let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
				let D = ((date.getDate() < 10) ? '0'+ date.getDate():date.getDate()) + ' '
				let h = ((date.getHours() < 10) ? '0'+ date.getHours():date.getHours()) + ':'
				let m = (date.getMinutes() < 10) ? '0'+ date.getMinutes() : date.getMinutes()
				let transTime = Y + M + D + h + m
				return transTime
			},
			// 计算推荐数和吐槽数
			rateNumber(){
				// 判断数据是否为空
				if(this.food.ratings.length){
					this.recomNumber = this.food.ratings.filter(rating=>rating.rateType==0).length
					this.discloseNumber = this.food.ratings.filter(rating=>rating.rateType==1).length
				}
			},
			// 选择全部
			selAll(){
				this.allFlag=true
				this.recomFlag=false
				this.discloseFlag=false
			},
			// 选择推荐
			selRecm(){
				this.allFlag=false
				this.recomFlag=true
				this.discloseFlag=false
			},
			// 选择吐槽
			selDis(){
				this.allFlag=false
				this.recomFlag=false
				this.discloseFlag=true
			},
			// 增加食物，及返回当前元素坐标
			foodPlus(event){
				// 增加食物
				this.$store.commit('addfood',this.food)
				// 更新坐标
				let rect=event.target.getBoundingClientRect()
				// 计算小球到起点的向量
				let pos={}
				pos.x=rect.left-32
				pos.y=rect.top-(window.innerHeight-48)
				this.$store.commit('upDatePos',pos)
				this.$store.commit('showCtrol')
			}
		},
		components:{
			cartCtrl
		}
	}
</script>
<style lang="stylus">
	@import 'foodDetail'
</style>