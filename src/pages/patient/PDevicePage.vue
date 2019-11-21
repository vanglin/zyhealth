<template lang="html">
  <main>
    <van-nav-bar
      title="我的设备"
      left-text=""
      left-arrow
      @click-left="onClickLeft"
    />

    <section>
      <van-swipe :autoplay="3000" class="swipe">
        <van-swipe-item>
          <img class="swipeimg" src="../../assets/images/step1.png" alt="">
        </van-swipe-item>
        <van-swipe-item>
          <img class="swipeimg" src="../../assets/images/step2.png" alt="">
        </van-swipe-item>
        <van-swipe-item>
          <img class="swipeimg" src="../../assets/images/step3.png" alt="">
        </van-swipe-item>
        </van-swipe-item> -->
      </van-swipe>
    </section>

    <section class="device">
      <p class="bind">绑定设备</p>
      <p class="hint">输入设备编码或扫描二维码</p>
      <div class="flexrow">
        <div class="flexcol">
          <img src="../../assets/images/ma.png" alt="">
          <p>扫二维码</p>
        </div>
        <div class="flexcol" @click='tosnpage()'>
          <img src="../../assets/images/snma.png" alt="">
          <p>手动输入SN码</p>
        </div>
      </div>
    </section>

    <section class="buy">
      <p class="mai">购买设备</p>
      <p class="hint">若你还未有设备，可以点击“购买设备”进入中亿微商购买。</p>

      <div class="buyimg">
        <img src="../../assets/images/mai.png" alt="">
      </div>


      <p class="maihint">购买设备</p>
    </section>


  </main>
</template>

<script>
export default {
  data(){
    return{

    }
  },
  methods:{
    onClickLeft() {
      this.$router.back();
    },
    tosnpage(){
      this.$router.push({path:'/psn'});
    }
  }
}
</script>

<style lang="css" scoped>

main{
  background-color: #f5f5f5;
  min-height: 100vh;
}

section{
  margin-bottom: 10px;
}

.swipe{
  height: 200px;
}
.swipeimg{
  height: 200px;
  width: 100%;
  display: block;
  box-sizing: border-box;
  /* padding: 30px 60px; */
}

.device{
  background-color: #fff;
  padding: 10px;
}

.device .bind{
  color: #37BEA9;
  margin: 0 0 6px 0;
}
.device .hint{
  font-size: 14px;
  /* margin: 0 0 6px 0; */
}
.device .flexrow{
  display: flex;
  justify-content: center;
  align-items: center;
}
.device .flexrow .flexcol{
  flex:1;
  text-align: center;
}
.device .flexrow .flexcol img{
  width: 50px;
  height: 50px;

}
.device .flexrow .flexcol p{
  text-align: center;
  font-size: 12px;
  margin: 0;
  padding: 6px 0 0 0;
}

.buy{
  background-color: #fff;
  padding: 10px;
}
.buy .mai{
  color: #FF9966;
  margin: 0 0 6px 0;
}
.buy .hint{
  font-size: 14px;
}

.buy .buyimg{
  text-align: center;
}
.buy img{
  width: 50px;
  height: 50px;
}

.buy .maihint{
  margin: 0;
  padding: 0;
  font-size: 12px;
  text-align: center;
}
</style>
