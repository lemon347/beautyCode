import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import fastclick from 'fastclick'
import {Button} from 'mint-ui'


import './mock/mockServer'

fastclick.attach(document.body)
Vue.component(Button.name, Button)

new Vue({
  el: "#app",
  render: h=>h(App),
  router,   //使用vue-router
  store    //使用vuex
})
