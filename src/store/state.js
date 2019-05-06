/*
* 状态对象
* 操作state的是mutations
* 操作mutations的是actions
* 基于state的是getters
* */
export default{
    latitude: 40.10038,     //纬度
    longitude: 116.36867,   //经度
    address: {},            //地址相关信息对象
    categorys: [],          //食品分类数组
    shops: [],             //商家数组
    userInfo: {},       //用户信息
  //上面的address, categorys, shops 都需要从后台获取数据来返回数据
    goods: {},
    info: {},
    ratings: [],
    cartFoods: [],   //用户加入到购物车中的东西
    searchShops: []  //搜索得到的商家列表
}
