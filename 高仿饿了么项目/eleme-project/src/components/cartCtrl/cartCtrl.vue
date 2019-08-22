<template>
	<div class="cart-control">
		<transition name="roll">
			<div class="cart-minus" v-if="currentCount>0" @click.stop.prevent="$store.commit('minusfood',clickedfood)">
				<span class="icon-remove_circle_outline inner"></span>
			</div>
		</transition>
		<div class="count" v-if="currentCount>0">{{currentCount}}</div>
		<div class="cart-add" @click.stop.prevent="foodPlus($event)">
			<span class="icon-add_circle"></span>
		</div>
	</div>
</template>
<script>
	export default{
		props:{
			clickedfood:Object
		},
		computed:{
			// 当前食物数量
			currentCount(){
				let food=this.$store.state.selectedFoods.find((food)=>{
					return food.name==this.clickedfood.name
				})
				return food?food.count:0
			}
		},
		methods:{
			// 增加食物
			foodPlus(event){
				// 增加食物
				this.$store.commit('addfood',this.clickedfood)
				// 更新坐标
				let rect=event.target.getBoundingClientRect()
				// 计算小球到起点的向量
				let pos={}
				pos.x=rect.left-32
				pos.y=rect.top-(window.innerHeight-48)
				this.$store.commit('upDatePos',pos)
				this.$store.commit('showCtrol')
			}
		}
	}
</script>
<style lang="stylus">
.cart-control
	.cart-minus
		display inline-block
		padding 6px
		transition all 0.5s linear
		.inner
			color rgb(0,160,220)
			font-size 24px
			line-height 24px
			transition all 0.5s linear
		&.roll-enter-active,&.roll-leave-active
			transform translate3d(0,0,0)
			.inner
				display inline-block
				transform rotate(0)
		&.roll-enter,&.roll-leave-to
			opacity 0
			transform translate3d(100%,0,0)
			.inner
				transform rotate(180deg)
	.count
		display inline-block
		vertical-align top
		font-size 10px
		color rgb(147,153,159)
		line-height 24px
		text-align center
		padding 6px
	.cart-add
		display inline-block
		color rgb(0,160,220)
		padding 6px
		font-size 24px
		line-height 24px
</style>