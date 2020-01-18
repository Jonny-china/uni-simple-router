import Vue from 'vue'
import Router, {
	RouterMount
} from 'uni-simple-router';
import {
	vueDevRoutes
} from './vueRouterDev_true/devTrue.js'
Vue.use(Router);


const routesConfig = {
	h5: {
		paramsToQuery: true,
		loading: true,
		vueRouterDev: false,
		useUniConfig: true,
		resetStyle: () => {
			return {
				style: `
				#router-loadding .loadding {
					background-color: #f00 !important;
					box-shadow: 0 0 15px #f00 !important;
				}
				`
			}
		}
	},
	APP:{
		loddingPageStyle:()=>JSON.parse('{"backgroundColor":"#96DBF3"}'),
		loddingPageHook:(view)=>{
			view.drawBitmap('/static/wait.gif', {}, {
				top: 'auto',
				left: 'auto',
				width: '200px',
				height: '200px'
			})
		},
		holdTabbarStyle:()=>JSON.parse('{"backgroundColor":"#FF0000","opacity":0.2}')
	},
	encodeURI: true,
	debugger: true,
	routes: [{
			aliasPath: '/router5',
			path: '/pages/router/router5/router5',
			name: 'router5',
            beforeEnter:(to,from,next)=>{
				console.log(to.name)
				console.log(from.name)
                next();
            }
		},
		{
			path: '/pages/login/login',
			name: 'login'
		},
		{
			path: '/pages/tabbar/tabbar-5/tabbar-5',
			name: 'tabbar-5'
		},
		{
			path: '/pages/router/router6/router6',
			name: 'router6'
		},
		{
			aliasPath: '/',
			path: "/pages/tabbar/tabbar-1/tabbar-1",
			component: () => import('@/pages/component/router1.vue'),
			name: 'tabbar-1',
		},
		{
			aliasPath: '/tabbar2',
			component: () => import('@/pages/component/router2.vue'),
			path: "/pages/tabbar/tabbar-2/tabbar-2",
			name: 'tabbar-2',
		},
		{
			aliasPath: '/tabbar3',
			component: () => import('@/pages/component/router3.vue'),
			path: "/pages/tabbar/tabbar-3/tabbar-3",
			name: 'tabbar-3',
		},
		{
			aliasPath: '/tabbar4',
			component: () => import('@/pages/component/router4.vue'),
			path: "/pages/tabbar/tabbar-4/tabbar-4",
			name: 'tabbar-4',
		},
		{
			component: () => import('@/pages/test/404.vue'),
			path: "/pages/router/router1/router1",
			name: 'router1'
		}, {
			component: () => import('@/pages/test/404.vue'),
			path: "/pages/router/router2/router2",
			name: 'router2',
		}, {
			component: () => import('@/pages/test/404.vue'),
			path: "/pages/router/router3/router3",
			name: 'router3'
		}, {
			component: () => import('@/pages/test/404.vue'),
			path: "/pages/router/router4/router4",
			name: 'router4'
		},

		{
			path: '/pages/test/404',
			aliasPath: '/404',
			name: '404',
			component: () => import('@/pages/test/404.vue'),
		},
		{
			path: '*',
			name: 'moddle',
			redirect: to => {
				console.log(to)
				const name = whitelist[to.path];
				if (name) {
					return {
						name
					};
				}
				return {
					name: '404'
				}
			}
		}
	]
}
if (routesConfig.h5.vueRouterDev) {
	routesConfig.routes = vueDevRoutes;
}

const router = new Router(routesConfig);


const whitelist = {
	'/pages/tabbar/tabbar-1/tabbar-1': 'tabbar-1',
	'/pages/tabbar/tabbar-2/tabbar-2': 'tabbar-2',
	'/pages/tabbar/tabbar-3/tabbar-3': 'tabbar-3',
	'/pages/tabbar/tabbar-4/tabbar-4': 'tabbar-4',
	'/pages/tabbar/tabbar-5/tabbar-5': 'tabbar-5'
}

let count =0;

router.beforeEach((to, from, next) => {
	console.log(to)
	console.log(from)
	next();
	// count++
	// if(count==1){
	// 	next({
	// 		path:'/pages/login/login',
	// 		NAVTYPE:'replaceAll',
	// 		query:{
	// 			userOut:true
	// 		}
	// 	});
	// }else{
	// 	if(to.name=='tabbar-1'){
	// 		next({
	// 			name:'router5',
	// 			NAVTYPE:'push',
	// 			animation:{
	// 				animationType:'slide-in-top',
	// 				animationDuration:1000
	// 			}
	// 		});
	// 	}else{
	// 		next();
	// 	}
	// }
})
router.afterEach((to, from) => {
	console.log(to)
	console.log(from)
	// setTimeout(function() {
	// 	uni.setNavigationBarTitle({
	// 	    title: to.name
	// 	});
	// }, 50);
	// setTimeout(()=>{
	// 	console.log(__uniConfig)
	// },1000)
	// console.log('afterEach')
})

// setTimeout(() => {
// 	router.push({name:'router5'})
// }, 5000);

export default RouterMount;
