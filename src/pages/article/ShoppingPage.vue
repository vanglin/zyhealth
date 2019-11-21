<template lang="html">
  <main>
    <van-nav-bar
      title="商城"
    />
    <!-- <section>
      <van-swipe :autoplay="3000" class="swipe">
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <img class="swipeimg" v-lazy="image" />
        </van-swipe-item>
      </van-swipe>
    </section> -->

    <section>
      <div class="flexrow">
        <img src="../../assets/images/hot.png" alt="">
        <p>商品推荐</p>
      </div>

      <div class="goodrow">

        <div class="goodcol" v-for="item in this.items" :key="item.id">
          <img class="goodimg" :src="item.deviceImg" />
          <p class="goodtitle">{{item.deviceName}}</p>
          <p class="goodprice">¥ {{item.devicePrice}} 元</p>
        </div>
      </div>



    </section>



  </main>
</template>

<script>
import axios from 'axios';
import { Toast } from 'vant';
import {picUrlPrefix} from '../../Global.js';

export default {
  data(){
    return{
      items:[],
    }
  },
  methods:{
    getdata(){
      axios.get('/API/api/service/device/list', {

      })
      .then(response => {
        this.items = response.data;
        console.log(response.data);


      })
      .catch(error => {
        Toast('获取数据失败');
      });
    }

  },
  mounted(){
    this.getdata();
  }
}
</script>

<style lang="css" scoped>
main{
  background-color: #f5f5f5;
  min-height: 100vh;
}
.swipe{
  height: 160px;
}
.swipeimg{
  height: 160px;
  width: 100%;
  display: block;
  box-sizing: border-box;
  /* padding: 30px 60px; */
}
.flexrow{
  background-color: #ffffff;
  /* margin-top: 10px; */
  display: flex;
  padding: 0 10px;
  align-items: center;
  border-bottom: 1px solid #e5e5e5;
  /* justify-content: center; */
}
.flexrow img{
  width: 14px;
  height: 18px;
}
.flexrow p{
  margin-left: 8px;
  font-size: 14px;
}

.goodrow{
  display: flex;
  background-color: #fff;
  /* padding:10px; */
  /* border-bottom: 1px solid #e5e5e5; */
  flex-wrap: wrap;
  /* margin-bottom: 10px; */
}
.goodcol{
  flex:0 0 50%;
  border-bottom: 1px solid #e5e5e5;
  border-left: 1px solid #e5e5e5;
  border-right: 1px solid #e5e5e5;

  margin-bottom: 10px;
  box-sizing: border-box;
}
.goodimg{
  width: 100%;
  height: 60vw;
  box-sizing: border-box;
  /* padding: 10px; */
}
.goodtitle{
  /* padding-left: 10px; */
  margin:0px 0px 0px 4px;
  font-size: 14px;
}
.goodprice{
  /* padding-left: 10px; */
  margin:0px 0px 10px 4px;
  font-size: 14px;
  color:#F56C6C;
}
</style>
