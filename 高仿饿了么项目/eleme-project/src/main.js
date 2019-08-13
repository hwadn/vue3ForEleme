import Vue from "vue";
import './plugins/axios'
import App from "./App.vue";
import VueRouter from "vue-router"
import goods from "./components/goods/goods"
import ratings from "./components/rating/ratings"
import seller from "./components/seller/seller"

Vue.use(VueRouter)

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

new Vue({
	router,
	render: h => h(App)
}).$mount("#app");

// 初始路由组件显示goods
router.push('ratings').catch(err=>{
	
})