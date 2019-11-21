<template lang="html">
  <main>
    <van-nav-bar
      title="我的消息"
      left-text=""
      left-arrow
      @click-left="onClickLeft"
    />

    <div class="flexrow" v-for="item in res" :key="item.id" @click='todetail(item)'>
      <div class="flexcol">
        <p>医生回复了你的提问</p>
        <p>{{item.question}}</p>
      </div>
      <div class="flexcol2">
        <p>{{item.replyTime}}</p>
      </div>
    </div>

  </main>
</template>

<script>
import axios from 'axios';
import { Toast } from 'vant';
export default {
  data(){
    return{
      res:''
    }
  },
  methods:{
    onClickLeft() {
      this.$router.back();
    },
    todetail(item){
      this.$router.push({path:'/pmessagedetail',query: { answerId: item.id}});
    },
    getdata(){
      let userid = localStorage.getItem('userid');
      var params = {
        megOwner:userid
      }
      axios.post('API/api/service/qaMeg/unReadMeg/',params)
      .then(response => {
        this.res = response.data;
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
.flexrow{
  display: flex;
  padding: 10px;
  border-bottom: 1px solid #e5e5e5;
}
.flexcol{
  flex:2;

}
.flexcol p{
  margin: 0;
  padding: 0;
}
.flexcol p:last-child{
  font-size: 12px;
}
.flexcol2{
  flex:1;
}
.flexcol2 p{
  margin: 0;
  padding: 0;
  font-size: 12px;
  text-align: right;
}

</style>
