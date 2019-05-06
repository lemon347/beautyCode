<template>
  <div class="star" :class="'star-' + size">
    <span class="star-item" v-for="(sc, index) in starClasses" :class="sc" :key="index"></span>
  </div>
</template>

<script>
    export default {
        props: {
            score: Number,
            size: Number
        },
        computed:{
            starClasses(){
                const getScore  = this.score
                const arr = []
                //向arr中添加n个'on'
                //向arr中添加0/1个'half'
                //向arr中添加n个off
                //总共的个数是5个,
              // 4.3   4个on, 1个off,   4.7   4个on ,1个half, 1个off

               const parseInterNum = Math.floor(getScore)
                for(let i=0; i<parseInterNum; i++){
                    arr.push("on")
                }
                if((getScore * 10 - parseInterNum * 10) > 5){
                  arr.push("half")
                }
                if(arr.length < 5){
                  arr.push("off")
                }
                return arr
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .star //2x图 3x图
    float left
    font-size 0
    .star-item
      display inline-block
      background-repeat no-repeat
    &.star-48
      .star-item
        width 20px
        height 20px
        margin-right 22px
        background-size 20px 20px
        &:last-child
          margin-right: 0
        &.onf
          bg-image('./images/stars/star48_on')
        &.half
          bg-image('./images/stars/star48_half')
        &.off
          bg-image('./images/stars/star48_off')
    &.star-36
      .star-item
        width 15px
        height 15px
        margin-right 6px
        background-size 15px 15px
        &:last-child
          margin-right 0
        &.on
          bg-image('./images/stars/star36_on')
        &.half
          bg-image('./images/stars/star36_half')
        &.off
          bg-image('./images/stars/star36_off')
    &.star-24
      .star-item
        width 10px
        height 10px
        margin-right 3px
        background-size 10px 10px
        &:last-child
          margin-right 0
        &.on
          bg-image('./images/stars/star24_on')
        &.half
          bg-image('./images/stars/star24_half')
        &.off
          bg-image('./images/stars/star24_off')
</style>
