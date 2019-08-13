<template>
	<div class="ratings-wrapper">
		<div class="scores">
			<div class="comprehensive">
				<h1>{{seller.score}}</h1>
				<div class="text">综合评分</div>
				<div class="contrast">高于周边商家{{seller.rankRate}}%</div>
			</div>
			<div class="respective">
				<div class="score service-score">
					<div class="text">服务态度</div>
					<div class="star">
						<star :size="36" :score="seller.serviceScore"></star>
					</div>
					<span class="number">{{seller.serviceScore}}</span>
				</div>
				<div class="score food-score">
					<div class="text">食物评分</div>
					<div class="star">
						<star :size="36" :score="seller.foodScore"></star>
					</div>
					<span class="number">{{seller.foodScore}}</span>
				</div>
				<div class="score delivery-time">
					<div class="text">送到时间</div>
					<div class="delivery">
						{{seller.deliveryTime}}分钟
					</div>
				</div>
			</div>
		</div>
		<div class="divider"></div>
		<div class="ratings-info">
			<div class="bar">
				<div class="filter">
					<div class="block all" :class="{active:allFlag}" @click="selAll()">全部{{seller.ratingCount}}</div>
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
							<img :src="rating.avatar" width="28" height="28">
						</div>
						<div class="detail">
							<div class="user">
								<div class="name">{{rating.username}}</div>
								<div class="time">{{timeTrans(rating.rateTime)}}</div>
								
							</div>
							<div class="score">
								<div class="star">
									<star :size="24" :score="rating.score"></star>
								</div>
								<div class="delivery-time" v-if="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</div>
							</div>
							<div class="text" v-if="rating.text">{{rating.text}}</div>
							<div class="dishes" v-if="rating.recommend.length">
								<div class="icon-thumb_up"></div>
								<div class="dish" v-for="(dish,index) in rating.recommend" v-bind:key="index">{{dish}}</div>
							</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
	import axios from 'axios'
	import star from '../star/star'
	export default{
		data(){
			return {
				seller: {},
				ratings: {},
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
		created(){
			axios.get('static/data.json').then((res)=>{
				this.seller = res.data.seller
				this.ratings = res.data.ratings
				this.rateNumber()
			})
		},
		computed:{
			// 评论过滤
			ratingsSelect(){
				// 判断数据是否为空
				if(this.ratings.length){
					// 显示全部
					if(this.allFlag){
						return this.textFlag?this.ratings.filter(rating=>rating.text.length>0):this.ratings
					}
					// 显示推荐
					if(this.recomFlag){
						return this.textFlag?(this.ratings.filter(rating=>rating.text.length>0)).filter(rating=>rating.rateType==0):this.ratings.filter(rating=>rating.rateType==0)
					}
					// 吐槽
					if(this.discloseFlag){
						return this.textFlag?(this.ratings.filter(rating=>rating.text.length>0)).filter(rating=>rating.rateType==1):this.ratings.filter(rating=>rating.rateType==1)
					}
				}
			}
		},
		methods:{
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
				if(this.ratings.length){
					this.recomNumber = this.ratings.filter(rating=>rating.rateType==0).length
					this.discloseNumber = this.ratings.filter(rating=>rating.rateType==1).length
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
			}
		},
		components:{
			star
		}
	}
</script>
<style lang="stylus">
	@import 'ratings'
</style>