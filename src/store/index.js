/*
* vuex最核心的管理对象store
* 但是这个还有4个最核心的模块,那4个模块都是对象,
* 还有基于action和mutation常量交换的模块
* 操作state的是mutations
* 操作mutations的是actions
* 基于state的是getters
* */
import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
