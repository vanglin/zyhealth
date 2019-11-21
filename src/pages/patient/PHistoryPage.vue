<template lang="html">
  <main>
    <van-nav-bar
      title="历史记录"
      left-text=""
      left-arrow
      @click-left="onClickLeft"
    />

    <section>
      <van-row class="title">
        <van-col span="12" class="titlecell">日期</van-col>
        <van-col span="6" class="titlecell">类型</van-col>
        <van-col span="6" class="titlecell">得分</van-col>
      </van-row>
      <van-row class="content" v-for="item in res" :key="item.id">
        <van-col span="12" class="contentcell">{{item.evaTime}}</van-col>
        <van-col span="6" class="contentcell">{{item.evaType == 'SAR' ? '鼻炎':item.evaType}}调查</van-col>
        <van-col span="6" class="contentcell">{{item.evaValue}}</van-col>
      </van-row>
    </section>

  </main>
</template>

<script>
import axios from 'axios';
import { Toast } from 'vant';
import moment from "moment";
export default {
  data(){
    return{
      res:'',
      evaType:'',
    }
  },
  methods:{
    onClickLeft() {
      this.$router.back();
    },
    getdata(){
      let userid = localStorage.getItem('userid');
      var params = {
        uid:userid,
        evaType:this.evaType,
        deviceId:-1,
        startTime:moment().format('YYYY') + '-01-01 00:00:00',
        endTime:moment().format('YYYY-MM-DD') + ' 24:00:00'
      }
      axios.post('/API/api/service/evaRec/getList',params)
      .then(response => {
        this.res = response.data;
      })
      .catch(error => {
        Toast('获取数据失败');
      });
    }
  },
  mounted(){
    this.evaType = this.$route.query.evaType;
    this.getdata();
  }
}
</script>

<style lang="css" scoped>
.title{
  background-color: #37BEA9;
  padding: 10px;
}
.titlecell{
  color: #fff;
  font-size: 14px;
}

.titlecell:last-child{
  text-align: right;
}

.content{
  padding: 10px;
  background-color: #fff;
  border: 1px solid #e5e5e5;
}

.content .contentcell{
  font-size: 14px;
}
.content .contentcell:last-child{
  text-align:right;
}
</style>
