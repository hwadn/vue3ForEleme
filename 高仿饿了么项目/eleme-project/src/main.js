import Vue from "vue";
import './plugins/axios'
import App from "./App.vue";
import VueRouter from "vue-router"
import Vuex from "vuex"
import goods from "./components/goods/goods"
import ratings from "./components/rating/ratings"
import seller from "./components/seller/seller"

Vue.use(VueRouter)
Vue.use(Vuex)

Vue.config.productionTip = false;

const routes = [
	{path:'/goods',component: goods},
	{path:'/ratings',component: ratings},
	{path:'/seller',component: seller},
]

const router = new VueRouter({
	routes,
	//设置链接激活时使用的CSS类名
	linkActiveClass: 'active'
})

const store = new Vuex.Store({
	state:{
		// 购物车食物
		selectedFoods:[],
		// 坐标
		posX:'',
		posY:'',
		shows:[false,false,false,false,false],
		ballCount:0
	},
	getters:{
		// 计算总价钱
		totalCost(state){
			let cost = 0
			for(let food of state.selectedFoods){
				cost += food.price * food.count
			}
			return cost
		},
		// 计算总数量
		totalCount(state){
			let count = 0
			for(let food of state.selectedFoods){
				count += food.count
			}
			return count
		}
	},
	mutations:{
		// 增加选购
		addfood(state,clickedfood){
			// 未选购直接增加count加入
			if(state.selectedFoods.length==0){
				Vue.set(clickedfood, 'count', 1)
				state.selectedFoods.push(clickedfood)
			}
			else{
				// 检索选购的食物是否存在
				let foodIndex=state.selectedFoods.findIndex((food)=>{
					return food.name==clickedfood.name
				})
				// 如果选购的食物不存在，就增加属性count，并加入
				if(foodIndex==-1){
					Vue.set(clickedfood, 'count', 1)
					state.selectedFoods.push(clickedfood)
				}
				// 如选购已经存在，就count+1
				else{
					let newcount=state.selectedFoods[foodIndex].count
					newcount++
					Vue.set(clickedfood, 'count', newcount)
				}
			}
		},
		// 减少选购
		minusfood(state,clickedfood){
			let foodIndex=state.selectedFoods.findIndex((food)=>{
				return food.name==clickedfood.name
			})
			let newcount=state.selectedFoods[foodIndex].count
			newcount--
			// 如果数量为0，直接删除
			if(newcount==0){
				state.selectedFoods.splice(foodIndex,1)
			}
			else{
				Vue.set(clickedfood, 'count', newcount)
			}
		},
		// 清空
		clearAll(state){
			state.selectedFoods.splice(0)
		},
		// 更新当前点击处小球坐标
		upDatePos(state,pos){
			state.posX=pos.x
			state.posY=pos.y
			state.posS=pos.S
		},
		// 更改小球显示
		showCtrol(state){
			// 激活当前小球动画
			Vue.set(state.shows, state.ballCount, true)
			// 如果小球数大于5就置零，从0开始，一直循环
			state.ballCount++
			if(state.ballCount>=5){
				state.ballCount=0
			}
			// 设置下一个小球不显示，以便下次点击时激活动画
			Vue.set(state.shows, state.ballCount, false)
		}
	}
})

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount("#app");

// 初始路由组件显示goods
router.push('goods').catch(err=>{
	
})