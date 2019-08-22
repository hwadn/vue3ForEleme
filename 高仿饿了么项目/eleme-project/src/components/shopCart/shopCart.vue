<template>
	<div class="shop-cart">
		<div class="cart-wrapper" @click="showList()">
			<div class="cart">
				<div class="total-count" v-if="this.$store.getters.totalCount">
					{{this.$store.getters.totalCount}}
				</div>
				<div class="box" :class="{active:this.$store.getters.totalCount}">
					<i class="icon-shopping_cart"></i>
				</div>
			</div>
			<div class="cost" :class="{active:this.$store.getters.totalCost}">
				&#65509;{{this.$store.getters.totalCost}}
			</div>
		</div>
		<div class="delivery-price">
			另需要配送费&#65509;{{seller.deliveryPrice}}元
		</div>
		<div class="min-price" :class="{active:diffCost<=0}">
			<span v-if="diffCost==20">
				&#65509;{{diffCost}}起送
			</span>
			<span v-if="diffCost<20 && diffCost>0">
				还差&#65509;{{diffCost}}
			</span>
			<span v-if="diffCost<=0">去结算</span>
		</div>
		<div class="ball-container">
			<ball v-for="show in this.$store.state.shows" :show="show"></ball>
		</div>
		<transition name="upDown">
			<div class="shop-list" v-show="costShow">
				<div class="title">
					<div class="text">购物车</div>
					<div class="clean" @click.stop.prevent="clean">清空</div>
				</div>
				<div class="list">
					<ul>
						<li v-for="food in this.$store.state.selectedFoods">
							<div class="name">{{food.name}}</div>
							<div class="price">&#65509;{{food.price}}</div>
							<cartCtrl :clickedfood="food"></cartCtrl>
						</li>
					</ul>
				</div>
			</div>
		</transition>
		<transition name="fadeBg">
			<div class="backdrop" v-show="costShow" @click="costShow=false"></div>
		</transition>
	</div>
</template>
<script>
	import axios from 'axios'
	import cartCtrl from '../cartCtrl/cartCtrl'
	import ball from '../ball/ball'
	export default{
		data(){
			return {
				seller:{},
				costShow:false
			}
		},
		created(){
			axios.get('static/data.json').then(res=>{
				this.seller=res.data.seller
			})
		},
		computed:{
			diffCost(){
				return this.seller.minPrice-this.$store.getters.totalCost
			}
		},
		methods:{
			// 显示列表
			showList(){
				if(this.$store.getters.totalCost<=0){
					return
				}
				else{
					this.costShow=!this.costShow
				}
			},
			// 清空
			clean(){
				this.$store.commit('clearAll')
				this.costShow=false
			}
		},
		components:{
			cartCtrl,
			ball
		}
	}
</script>
<style lang="stylus">
	@import 'shopCart'
</style>