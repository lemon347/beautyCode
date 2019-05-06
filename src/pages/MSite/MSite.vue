<template>
  <section class="msite">
    <!--首页头部-->
    <HeaderTop :title="address.name">
        	<router-link class="header_search" slot="left" to="/search">
        		<i class="iconfont icon-sousuo"></i>
        	</router-link>
          <router-link :to="userInfo._id ? '/userinfo' : '/login'" class="header_login" slot="right">
                <span class="header_login_text" v-if="!userInfo._id">登录/注册</span>
                <span class="header_login_text" v-else><i class="iconfont icon-person"></i></span>
          </router-link>
    </HeaderTop>
    <div class="miste-content-wrapper">
      <div class="miste-content">
        <!--首页导航-->
        <nav class="msite_nav">
          <div class="swiper-container">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="(categorys, index) in categorysArr" :key="index">
                <a href="javascript:" class="link_to_food" v-for="(category, index) in categorys" :key="index">
                  <div class="food_container">
                    <img :src="baseImageUrl + category.image_url">
                  </div>
                  <span>{{category.title}}</span>
                </a>
              </div>

            </div>
            <!-- Add Pagination -->
            <div class="swiper-pagination"></div>
          </div>

        </nav>
        <!--首页附近商家-->
        <div class="msite_shop_list">
          <div class="shop_header">
            <i class="iconfont icon-xuanxiang"></i>
            <span class="shop_header_title">附近商家</span>
          </div>
             <ShopList/>
        </div>
      </div>
    </div>
  </section>
</template>



<script>
  import {mapState, mapActions} from 'vuex'
  import Swiper from 'swiper'
  import 'swiper/dist/css/swiper.min.css'
	import HeaderTop from '../../components/HeaderTop/HeaderTop'
	import ShopList from '../../components/ShopList/ShopList'

	export default {
    data() {
        return {
            baseImageUrl: 'https://fuss10.elemecdn.com'
        }
    },
		mounted(){
      //发请求,获取商品分类的列表
      //this.$store.dispatch('getCategorys')
      //上面的等于    methods: {...mapActions(['getCategorys'])},
      //mounted(){this.getCategorys()}
      this.getCategorys()
      this.$store.dispatch('getShops')
		},
    computed: {
      //读取state中数据的状态
      ...mapState(['address', 'categorys', 'userInfo']),
      /*根据categorys1维数组生成一个2维数组,小数中的最大的元素个数为8*/
      categorysArr(){
        const categorys = this.categorys
        //const {categorys} = this
        const arr = []
        let minArr = []
        categorys.forEach(e => {
          if(minArr.length === 8){
              minArr = []
          }
          //将小的数组塞入大的数组里面
          if(minArr.length === 0){
            arr.push(minArr)
          }
          //将每一项都放入小的数组里面
          minArr.push(e)
        })
        return arr
      }
    },
    methods: {
      ...mapActions(['getCategorys'])
    },
    watch: {
        categorys(value){   //数组中有数据了,在异步更新界面之前执行了
          //界面更新就立即创建Swiper对象
          this.$nextTick(() => {    //一旦完成界面更新,立即调用
            // 创建一个Swiper实例对象, 来实现轮播
            new Swiper('.swiper-container', {
              loop: true, // 可以循环轮播
              // 如果需要分页器
              pagination: {
                el: '.swiper-pagination',
              },
            })
          })
        }
    },
		components: {
			HeaderTop,
			ShopList
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .msite  //首页
    width 100%
    .miste-content-wrapper
      position fixed
      top: 45px
      bottom: 46px
      width: 100%
      .msite_nav
        bottom-border-1px(#e4e4e4)
        margin-top 15px
        height 200px
        background #fff
        .swiper-container
          width 100%
          height 100%
          .swiper-wrapper
            width 100%
            height 100%
            .swiper-slide
              display flex
              justify-content center
              align-items flex-start
              flex-wrap wrap
              .link_to_food
                width 25%
                .food_container
                  display block
                  width 100%
                  text-align center
                  padding-bottom 10px
                  font-size 0
                  img
                    display inline-block
                    width 50px
                    height 50px
                span
                  display block
                  width 100%
                  text-align center
                  font-size 13px
                  color #666
          .swiper-pagination
            >span.swiper-pagination-bullet-active
              background #02a774
      .msite_shop_list
        top-border-1px(#e4e4e4)
        margin-top 10px
        background #fff
        .shop_header
          padding 10px 10px 0
          .shop_icon
            margin-left 5px
            color #999
          .shop_header_title
            color #999
            font-size 14px
            line-height 20px
</style>
