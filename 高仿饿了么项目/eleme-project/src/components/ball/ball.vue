<template>
	<div>
		<transition v-on:before-enter="beforeEnter" v-on:enter="enter" v-on:afterEnter="afterEnter" v-bind:css="false">
			<div v-show="show" class="drop">
				<div class="inner"></div>
			</div>
		</transition>
	</div>
</template>
<script>
	export default{
		props:{
			show:Boolean
		},
		methods:{
			beforeEnter(el){
				el.style.transform = `translate3d(0,${this.$store.state.posY}px,0)`
				let inner=el.getElementsByClassName("inner")[0]
				inner.style.transform=`translate3d(${this.$store.state.posX}px,0,0)`
				console.log('beforeEnter')
			},
			enter(el,done){
				el.offsetHeight
				el.style.transform = `translate3d(0,0,0)`
				el.style.transition=`all .4s cubic-bezier(0.49,-0.29,0.75,0.41)`
				let inner=el.getElementsByClassName("inner")[0]
				inner.style.transform= `translate3d(0,0,0)`
				inner.style.transition=`.4s`
				console.log('Enter')
				setTimeout(()=>{
					done()
				},400)
			},
			afterEnter(el){
				el.style.display='none'
				console.log('afterEnter')
			}
		}
	}
</script>
<style lang="stylus">
	.drop
		position fixed
		.inner
			position fixed
			width 16px
			height 16px
			background-color rgb(0,160,220)
			border-radius 50%
			z-index 100
</style>