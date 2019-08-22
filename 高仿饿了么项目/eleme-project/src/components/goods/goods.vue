<template>
	<div class="goods-wrapper">
		<div class="type-wrapper">
			<ul>
				<li v-for="(good,index) in goods" :key="index" @click="gotoFood(index)" :class="{active:menuActive[index]}">
					<span class="name">
						<span v-show="good.type>=0" class="icon" :class="iconClassMap[good.type]"></span>
						{{good.name}}
					</span>
				</li>
			</ul>
		</div>
		<div class="foods-wrapper" ref="foodsWrapper" @onscroll="setMenu(e)">
			<ul class="whole">
				<li class="respective" v-for="(good,index) in goods" :key="index">
					<h1 class="name">
						{{good.name}}
					</h1>
					<ul class="foods-items">
						<li class="food" v-for="food in good.foods"  @click="showDetail(food)">
							<div class="pic">
								<img :src="food.icon" width="57" height="57">
							</div>
							<div class="description">
								<div class="dish">{{food.name}}</div>
								<div v-if="food.description.length" class="descr">{{food.description}}</div>
								<div class="sell-info">
									<span class="count">月售{{food.sellCount}}份</span>
									<span class="rating">好评率{{food.rating}}%</span>
								</div>
								<div class="price">
									&#65509;<span class="new-price">{{food.price}}</span>
									<span class="old-price" v-if="food.oldPrice">&#65509;{{food.oldPrice}}</span>
								</div>
								<div class="cart-ctrl">
									<cartCtrl :clickedfood="food"></cartCtrl>
								</div>
								
							</div>
						</li>
					</ul>
				</li>
			</ul>
		</div>
		<shopCart></shopCart>
		<transition name="move">
			<foodDetail :food="selectedFood" v-if="selectedFood" v-on:showMenu="disFood()"></foodDetail>
		</transition>
	</div>
</template>
<script>
	import axios from 'axios'
	import cartCtrl from '../cartCtrl/cartCtrl'
	import shopCart from '../shopCart/shopCart'
	import foodDetail from '../foodDetail/foodDetail'
	import Vue from "vue";
	import {scrollToAnimate} from '../goods/scrollToAnimation.js'
	export default{
		data(){
			return {
				seller:{},
				goods:{},
				foodsListHeights:[],
				menuActive:[],
				selectedFood:''
			}
		},
		created(){
			axios.get('static/data.json').then(res=>{
				this.seller = res.data.seller
				this.goods = res.data.goods
				// json数据请求成功后，在dom更新渲染完成后调用
				this.$nextTick(()=>{
					this.calculateListHeights()
					this.menuActiveInit()
					this.$refs.foodsWrapper.addEventListener('scroll', this.setMenu, true);
				})
			})
			this.iconClassMap=['decrease','discount','special','invoice','guarantee']
		},
		methods:{
			// 食物页面跳转
			gotoFood(index){
				// document.querySelector('.foods-wrapper').scrollTo(0,this.foodsListHeights[index])
				let ele = document.querySelector('.foods-wrapper');
				// 获取当前位置
				let currentY = ele.scrollTop;
				scrollToAnimate('.foods-wrapper',currentY,this.foodsListHeights[index])
				// 激活点击项。vue无法检测数组内容变化，需要用vue.set实现
				for(let i=0;i<this.goods.length;i++){
					Vue.set(this.menuActive, i, false)
				}
				Vue.set(this.menuActive, index, true)
			},
			// 计算食物列表高度，做页面滚动使用
			calculateListHeights(){
				let height = 0
				this.foodsListHeights.push(height)
				let foodsList=this.$refs.foodsWrapper.querySelectorAll('.respective')
				for(let i=0;i<this.goods.length-1;i++){
					// 包括盒子边距
					height+=foodsList[i].offsetHeight
					this.foodsListHeights.push(height)
				}
			},
			// 主菜单样式初始化
			menuActiveInit(){
				this.menuActive.push(true)
				for(let i=0;i<this.goods.length-1;i++){
					this.menuActive.push(false)
				}
			},
			// foods滚动，设置menu样式
			setMenu(){
				// 获取滚动距离
				let height=document.getElementsByClassName('foods-wrapper')[0].scrollTop
				for(let i=0;i<this.foodsListHeights.length-1;i++){
					let heightTop = this.foodsListHeights[i]
					let heightBottom = this.foodsListHeights[i+1]
					if(heightTop<=height && height<heightBottom){
						// 激活点击项。vue无法检测数组内容变化，需要用vue.set实现
						for(let j=0;j<this.goods.length;j++){
							Vue.set(this.menuActive, j, false)
						}
						Vue.set(this.menuActive, i, true)
					}
				}
			},
			// 点击菜品，进入详细介绍
			showDetail(food){
				this.selectedFood=food
			},
			// 监听详细页面的返回按钮，点击了就设置未选中任何菜品
			disFood(){
				this.selectedFood=''
			}
		},
		components:{
			cartCtrl,
			shopCart,
			foodDetail
		}
	}
</script>
<style lang="stylus">
	@import 'goods'
</style>