import Vue from "vue";

export const state = {
  //用户数据
  userInfo: {},
  token:{}
};
export const mutations = {
  //储存用户信息
  setUserInfo(state, data) {
  	if (data) {
 		// state.userInfo =  Object.assign({}, state.userInfo, data);
		state.userInfo = Object.assign({}, data);;
  		// #ifdef H5
  		window.localStorage.setItem('userInfo', JSON.stringify(state.userInfo));
  		// #endif
  		// #ifndef H5
  		uni.setStorageSync('userInfo', state.userInfo);
  		// #endif
  	}
  },
  //存储Token
  setToken(state,data){
	  if(data){
		  state.token = Object.assign({},state.token,data);
		  // #ifdef H5
		  window.sessionStorage.setItem('token', JSON.stringify(state.token));
		  // #endif
		  // #ifndef H5
		  uni.setStorageSync('token', state.token);
		  // #endif
	  }
  },
  //退出App
  emptyToken(state) {
  	state.token = {};
  	// #ifdef H5
  	window.sessionStorage.removeItem("token");
  	// #endif
  	// #ifndef H5
  	uni.removeStorageSync("token");
  	// #endif
  },
  
  // 退出APP
  emptyUserInfo(state) {
  	state.userInfo = {};
  	// #ifdef H5
  	window.sessionStorage.removeItem("userInfo");
  	// #endif
  	// #ifndef H5
  	uni.removeStorageSync("userInfo");
  	// #endif
  },
};
export const actions = {
  
};
