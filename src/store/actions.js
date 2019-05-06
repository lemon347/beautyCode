/*
* 通过nutation间接更新state的多个方法的对象
* */
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USER_INFO,
  RESET_USER_INFO,
  RECEIVE_SHOP_GOODS,
  RECEIVE_SHOP_INFO,
  RECEIVE_SHOP_RATINGS,
  INCREMENT_FOOD_COUNT,
  DECREMENT_FOOD_COUNT,
  CLEAR_CART_FOOD,
  RECEIVE_SEARCH_SHOP
} from './mutation-types'
//引入api的接口
import {
  reqAddress,
  reqFoodsCategorys,
  reqShops,
  reqUserInfo,
  reqLogout,
  reqShopInfo,
  reqShopRatings,
  reqShopGoods,
  reqSearchShop
} from '../api'
export default {
  //actions需要和后台进行交互,定义3个异步action
  //异步获取地址
  async getAddress({commit, state}) {
    //发送异步ajax请
    const geohash = state.latitude + ',' + state.longitude
    const result = await reqAddress(geohash)
    //提交一个mutation
    if(result.code === 0){
        const address = result.data
      commit(RECEIVE_ADDRESS, {address})
    }
  },
  //异步获取食品分类列表
  async getCategorys({commit}){
    const result = await reqFoodsCategorys()
    if(result.code === 0){
      const categorys = result.data
      commit(RECEIVE_CATEGORYS, {categorys})
    }
  },
  //异步获取商家列表
  async getShops({commit, state}){
    const {longitude, latitude} = state
    const result = await reqShops(longitude, latitude)
    if(result.code === 0){
      const shops = result.data
      commit(RECEIVE_SHOPS, {shops})
    }
  },

  //同步记录用户信息
  recordUser({commit}, userInfo){
    commit(RECEIVE_USER_INFO, {userInfo});
  },

  //得到session中的用户信息
  async getUserInfo({commit}){
     const result = await reqUserInfo();
     if(result.code == 0){
        const userInfo = result.data;
        console.log(userInfo);
        commit(RECEIVE_USER_INFO,{userInfo})
     }
  },
  async logout({commit}){
    const result = await reqLogout();
    if(result.code === 0){
        commit(RESET_USER_INFO);
    }
  },
  async getShopGoods({commit}, callback){
      const result = await reqShopGoods();
      if(result.code == 0){
          const goods = result.data;
          commit(RECEIVE_SHOP_GOODS, {goods});
          //数据更新之后,通知一下组件
          callback && callback();
      }
  },
  async getShopInfo({commit}){
    const result = await reqShopInfo();
    if(result.code == 0){
      const info = result.data;
      commit(RECEIVE_SHOP_INFO, {info});
    }

  },
  async getShopRatings({commit}, callback){
    const result = await reqShopRatings();
    if(result.code == 0){
      const ratings = result.data;
      commit(RECEIVE_SHOP_RATINGS, {ratings});
      callback && callback();
    }
  },

  //同步执行的updateFoodCount
  updateFoodCount({commit},{isAdd, food}){
      if(isAdd){
          commit(INCREMENT_FOOD_COUNT, {food});
      }else{
          commit(DECREMENT_FOOD_COUNT, {food});
      }
  },
  clearCartFood({commit}){
      commit(CLEAR_CART_FOOD);
  },
  async getSearchShop({commit, state}, keyword){
    const geohash = state.latitude + ',' + state.longitude
    const result = await reqSearchShop(geohash, keyword)
    if (result.code === 0) {
      const searchShop = result.data;
      commit(RECEIVE_SEARCH_SHOP, {searchShop})
    }
  }
}
