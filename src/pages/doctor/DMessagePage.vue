<template lang="html">
  <main>
    <van-nav-bar
      title="我的消息"
      left-text=""
      left-arrow
      @click-left="onClickLeft"
    />

    <div class="flexrow" v-for="(item,index) in res" :key="item.id" @click='todetail(item)'>
      <div class="flexcol">
        <p>{{item.megOwnerName}}</p>
        <p>{{item.question}}</p>
      </div>
      <div class="flexcol2">
        <p>{{item.qaTime}}</p>
        <p v-bind:class="{ noreply: isreply[index] }">{{getstatus(item.isReply)}}</p>
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
      res:'',
      isreply:[],
    }
  },
  methods:{
    getstatus(isReply){
      if (isReply == 1) {
        return '已回复';
      }else{

        return '未回复';
      }
    },
    onClickLeft() {
      this.$router.back();
    },
    todetail(item){
      this.$router.push({path:'/dmessagedetail',query: { answerId: item.id}});
    },
    getdata(){
      let userid = localStorage.getItem('userid');
      var params = {
        answerId:userid,
        // isReply:0
      }
      axios.post('/API/api/service/qaMeg/listQas',params)
      .then(response => {
        this.res = response.data;

        for (var i = 0; i < this.res.length; i++) {
          let item = this.res[i].isReply;
          if (item == 1) {
            this.isreply[i] = false;
          }else{
            this.isreply[i] = true;
          }
        }
  
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
  flex:1;
}
.flexcol p{
  margin: 0;
  padding: 0;
}

.flexcol2{
  flex:1;
}
.flexcol2 p{
  margin: 0;
  padding: 0;
  text-align: right;
}

.noreply{
  color: #D0021B;
}

</style>
