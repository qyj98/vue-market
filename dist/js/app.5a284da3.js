(function(t){function e(e){for(var r,a,i=e[0],c=e[1],u=e[2],p=0,f=[];p<i.length;p++)a=i[p],Object.prototype.hasOwnProperty.call(o,a)&&o[a]&&f.push(o[a][0]),o[a]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(t[r]=c[r]);l&&l(e);while(f.length)f.shift()();return s.push.apply(s,u||[]),n()}function n(){for(var t,e=0;e<s.length;e++){for(var n=s[e],r=!0,a=1;a<n.length;a++){var i=n[a];0!==o[i]&&(r=!1)}r&&(s.splice(e--,1),t=c(c.s=n[0]))}return t}var r={},a={app:0},o={app:0},s=[];function i(t){return c.p+"js/"+({}[t]||t)+"."+{"chunk-12847614":"10625f35","chunk-2d22636c":"d44ab734","chunk-5c2748a4":"96589018","chunk-7aa75848":"f618348f"}[t]+".js"}function c(e){if(r[e])return r[e].exports;var n=r[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,c),n.l=!0,n.exports}c.e=function(t){var e=[],n={"chunk-12847614":1,"chunk-5c2748a4":1,"chunk-7aa75848":1};a[t]?e.push(a[t]):0!==a[t]&&n[t]&&e.push(a[t]=new Promise((function(e,n){for(var r="css/"+({}[t]||t)+"."+{"chunk-12847614":"696e9af9","chunk-2d22636c":"31d6cfe0","chunk-5c2748a4":"fe1599e6","chunk-7aa75848":"836c208e"}[t]+".css",o=c.p+r,s=document.getElementsByTagName("link"),i=0;i<s.length;i++){var u=s[i],p=u.getAttribute("data-href")||u.getAttribute("href");if("stylesheet"===u.rel&&(p===r||p===o))return e()}var f=document.getElementsByTagName("style");for(i=0;i<f.length;i++){u=f[i],p=u.getAttribute("data-href");if(p===r||p===o)return e()}var l=document.createElement("link");l.rel="stylesheet",l.type="text/css",l.onload=e,l.onerror=function(e){var r=e&&e.target&&e.target.src||o,s=new Error("Loading CSS chunk "+t+" failed.\n("+r+")");s.code="CSS_CHUNK_LOAD_FAILED",s.request=r,delete a[t],l.parentNode.removeChild(l),n(s)},l.href=o;var d=document.getElementsByTagName("head")[0];d.appendChild(l)})).then((function(){a[t]=0})));var r=o[t];if(0!==r)if(r)e.push(r[2]);else{var s=new Promise((function(e,n){r=o[t]=[e,n]}));e.push(r[2]=s);var u,p=document.createElement("script");p.charset="utf-8",p.timeout=120,c.nc&&p.setAttribute("nonce",c.nc),p.src=i(t);var f=new Error;u=function(e){p.onerror=p.onload=null,clearTimeout(l);var n=o[t];if(0!==n){if(n){var r=e&&("load"===e.type?"missing":e.type),a=e&&e.target&&e.target.src;f.message="Loading chunk "+t+" failed.\n("+r+": "+a+")",f.name="ChunkLoadError",f.type=r,f.request=a,n[1](f)}o[t]=void 0}};var l=setTimeout((function(){u({type:"timeout",target:p})}),12e4);p.onerror=p.onload=u,document.head.appendChild(p)}return Promise.all(e)},c.m=t,c.c=r,c.d=function(t,e,n){c.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},c.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},c.t=function(t,e){if(1&e&&(t=c(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(c.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)c.d(n,r,function(e){return t[e]}.bind(null,r));return n},c.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return c.d(e,"a",e),e},c.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},c.p="/",c.oe=function(t){throw console.error(t),t};var u=window["webpackJsonp"]=window["webpackJsonp"]||[],p=u.push.bind(u);u.push=e,u=u.slice();for(var f=0;f<u.length;f++)e(u[f]);var l=p;s.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"1d2a":function(t,e,n){"use strict";n("f691")},"4d35":function(t,e,n){"use strict";n("ebfc")},"56d7":function(t,e,n){"use strict";n.r(e);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("2b0e"),a=n("b970"),o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("transition",{attrs:{name:t.transitionName,mode:this.$router.back?"out-in":"in-out"}},[n("router-view",{staticClass:"view"})],1)],1)},s=[],i=(n("b0c0"),"goods");//! 保存到localstorage中的键值对键名
function c(){var t=localStorage.getItem(i);return t?JSON.parse(t):{}}function u(t){localStorage.setItem(i,JSON.stringify(t))}var p=n("7c78"),f={created:function(){var t=c(),e=Object(p["a"])();this.$store.commit("setCounterMap",t),this.$store.commit("setHistory",e)},data:function(){return{transitionName:"left"}},watch:{$route:function(t,e){"Classify"===t.name&&"Search"===e.name?this.$router.back="toSearch":"Search"===t.name&&"Classify"===e.name&&(this.$router.back="toClassify"),"toSearch"===this.$router.back?this.transitionName="right":"toClassify"===this.$router.back?this.transitionName="left":this.transitionName="",this.$router.back=""}}},l=f,d=(n("6b4b"),n("2877")),h=Object(d["a"])(l,o,s,!1,null,"1b4ac382",null),m=h.exports,b=(n("d3b7"),n("3ca3"),n("ddb0"),n("8c4f")),g=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"home-container"},[n("router-view"),n("TabBar")],1)},v=[],y=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("van-tabbar",{attrs:{route:"",fixed:""}},[n("van-tabbar-item",{attrs:{icon:"home-o",to:{name:"Home"}}},[t._v("首页")]),n("van-tabbar-item",{attrs:{icon:"apps-o",to:{name:"Classify"}}},[t._v("分类")]),n("van-tabbar-item",{attrs:{icon:"cart-o",id:"shop-car",badge:t.badge,to:{name:"Shopping"}}},[t._v("购物车")]),n("van-tabbar-item",{attrs:{icon:"user-circle-o",to:{name:"Me"}}},[t._v("我的")])],1)},w=[],k=n("5530"),S=(n("07ac"),n("2f62")),O={computed:Object(k["a"])(Object(k["a"])({},Object(S["b"])(["counterMap"])),{},{badge:function(){var t=Object.values(this.counterMap).reduce((function(t,e){return t+e}),0);return t>99&&(t="99+"),t}})},j=O,L=(n("1d2a"),Object(d["a"])(j,y,w,!1,null,"02a970d2",null)),x=L.exports,M={components:{TabBar:x}},C=M,T=(n("4d35"),Object(d["a"])(C,g,v,!1,null,"48fe5538",null)),_=T.exports;b["a"].prototype.back="",b["a"].prototype.goBack=function(){this.go(-1)},r["a"].use(b["a"]);var N=[{path:"/home",name:"Home",component:_,redirect:{name:"Classify"},children:[{path:"classify",name:"Classify",component:function(){return n.e("chunk-7aa75848").then(n.bind(null,"643d"))}},{path:"shopping",name:"Shopping",component:function(){return n.e("chunk-5c2748a4").then(n.bind(null,"fdaa"))}},{path:"me",name:"Me",component:function(){return n.e("chunk-2d22636c").then(n.bind(null,"e869"))}}]},{path:"/search",name:"Search",component:function(){return n.e("chunk-12847614").then(n.bind(null,"4e22"))}},{path:"*",redirect:{name:"Classify"}}],G=new b["a"]({mode:"hash",base:"/",routes:N}),R=G,$=n("1da1"),E=n("2909"),H=(n("96cf"),n("99af"),n("4e82"),n("159b"),n("a434"),n("bc3a")),A=n.n(H),P=A.a.create({baseURL:"https://mallapi.duyiedu.com/goods/",params:{appkey:"qyj98_1629126631087"}});P.interceptors.response.use((function(t){return t.data}),(function(t){return Promise.reject(t)}));var B=P;function I(t){return J.apply(this,arguments)}function J(){return J=Object($["a"])(regeneratorRuntime.mark((function t(e){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,B.get("/getsidebar",{params:{type:e}});case 2:return n=t.sent,t.abrupt("return",n);case 4:case"end":return t.stop()}}),t)}))),J.apply(this,arguments)}function q(t,e,n,r){return z.apply(this,arguments)}function z(){return z=Object($["a"])(regeneratorRuntime.mark((function t(e,n,r,a){var o;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,B.get("/getGoodsList",{params:{type:e,page:n,size:r,sort:a}});case 2:return o=t.sent,t.abrupt("return",o);case 4:case"end":return t.stop()}}),t)}))),z.apply(this,arguments)}function D(t){return U.apply(this,arguments)}function U(){return U=Object($["a"])(regeneratorRuntime.mark((function t(e){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,B.get("/likeSearch",{params:{likeValue:e}});case 2:return n=t.sent,t.abrupt("return",n);case 4:case"end":return t.stop()}}),t)}))),U.apply(this,arguments)}function F(t,e,n){return K.apply(this,arguments)}function K(){return K=Object($["a"])(regeneratorRuntime.mark((function t(e,n,r){var a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,B.get("/search",{params:{type:e,page:n,size:r}});case 2:return a=t.sent,t.abrupt("return",a);case 4:case"end":return t.stop()}}),t)}))),K.apply(this,arguments)}function V(t){return Q.apply(this,arguments)}function Q(){return Q=Object($["a"])(regeneratorRuntime.mark((function t(e){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,B.get("/getGoodsByIds",{params:{value:e}});case 2:return n=t.sent,t.abrupt("return",n);case 4:case"end":return t.stop()}}),t)}))),Q.apply(this,arguments)}var W={getTabList:I,getGoodsList:q,getLikeSearch:D,getSearchList:F,getGoodsByIds:V};r["a"].use(S["a"]);var X=new S["a"].Store({state:{tabAsideList:[],showLoading:!1,tabName:"",goodsList:[],sort:"all",total:0,type:null,counterMap:{},searchHsitory:[],selectedGoods:[]},mutations:{settabAsideList:function(t,e){t.tabAsideList=e},setShowLoading:function(t,e){t.showLoading=e},setGoodsList:function(t,e){t.goodsList=[].concat(Object(E["a"])(t.goodsList),Object(E["a"])(e))},setTabName:function(t,e){t.tabName=e},setSortType:function(t,e){t.sort=e},setGoodsType:function(t,e){t.type=e},setGoodsTotal:function(t,e){t.total=e},resetGoodsList:function(t){t.goodsList=[]},setCounterMap:function(t,e){t.counterMap=e},setHistory:function(t,e){t.searchHsitory=e},storageChange:function(t,e){var n=e.id,a=e.value;t.counterMap[n]?1===t.counterMap[n]&&-1===a?r["a"].delete(t.counterMap,n):r["a"].set(t.counterMap,n,t.counterMap[n]+a):r["a"].set(t.counterMap,n,1),u(t.counterMap)},deleteStorageItem:function(t,e){r["a"].delete(t.counterMap,e),u(t.counterMap)},historyAdd:function(t,e){t.searchHsitory.forEach((function(n,r){e.text===n.text&&t.searchHsitory.splice(r,1)})),t.searchHsitory.unshift(e),t.searchHsitory.length>10&&t.searchHsitory.splice(10,1),Object(p["c"])(t.searchHsitory)},setSelectedGoods:function(t,e){t.selectedGoods.unshift(e)}},actions:{getAsideList:function(t,e){return Object($["a"])(regeneratorRuntime.mark((function n(){var r;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return t.commit("setShowLoading",!0),n.next=3,W.getTabList(e);case 3:r=n.sent,t.commit("settabAsideList",r),t.commit("setShowLoading",!1);case 6:case"end":return n.stop()}}),n)})))()},setSortType:function(t,e){t.commit("setSortType",e)},getGoodsList:function(t,e){return Object($["a"])(regeneratorRuntime.mark((function n(){var r,a,o,s,i,c,u,p,f,l,d;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return r=e.type,a=void 0===r?t.state.type:r,o=e.page,s=void 0===o?1:o,i=e.size,c=void 0===i?7:i,u=e.sort,p=void 0===u?t.state.sort:u,n.next=3,W.getGoodsList(a,s,c,p);case 3:f=n.sent,l=f.list,d=f.total,t.commit("setGoodsList",l),t.commit("setGoodsTotal",d),t.commit("setGoodsType",a);case 9:case"end":return n.stop()}}),n)})))()}},modules:{}}),Y=new r["a"]({});r["a"].prototype.$bus=Y;n("499a"),n("157a");r["a"].use(a["a"]),r["a"].config.productionTip=!1,r["a"].prototype.$api=W,new r["a"]({router:R,store:X,render:function(t){return t(m)}}).$mount("#app")},"6b4b":function(t,e,n){"use strict";n("cd43")},"7c78":function(t,e,n){"use strict";n.d(e,"b",(function(){return a})),n.d(e,"a",(function(){return o})),n.d(e,"c",(function(){return s}));n("d3b7"),n("25f0");var r="history";//! 保存到localstorage中的键值对键名
function a(){return Date.now()+Math.random().toString(16).substr(2,4)}function o(){var t=localStorage.getItem(r);return t?JSON.parse(t):[]}function s(t){localStorage.setItem(r,JSON.stringify(t))}},cd43:function(t,e,n){},ebfc:function(t,e,n){},f691:function(t,e,n){}});
//# sourceMappingURL=app.5a284da3.js.map