<template lang="html">
  <main>
    <van-nav-bar
      title="我的问答"
      left-text=""
      left-arrow
      @click-left="onClickLeft"
    />

    <van-tabs @click="handleTabClick">
      <van-tab  :title="'待回复'">
      </van-tab>
      <van-tab :title="'已回复'">
      </van-tab>
    </van-tabs>

    <section v-show='curindex == 0'>
      <van-collapse v-model="activeNames" accordion>


        <van-collapse-item v-for="item in unreplist" :key="item.id">
         <div slot="title" class="daianswertitle">
            <img src="../../assets/images/wen.png" alt="">
            <span>{{item.question}}</span>
         </div>
         <div class="daianswer">
          <textarea name="name" rows="8" cols="80" placeholder="请留言" v-model='message'></textarea>
          <van-button bottom-action class="feedbtn" @click="addreply(item)">回复</van-button>
         </div>
        </van-collapse-item>
      </van-collapse>


    </section>

    <section v-show='curindex == 1'>
      <van-collapse v-model="activeNames" accordion>
        <van-collapse-item v-for="item in replist" :key="item.id">
         <div slot="title" class="answertitle">
            <img src="../../assets/images/wen.png" alt="">
            <span>{{item.question}}</span>
         </div>
         <div class="answer">
           <div class="answerrow">
             <img src="../../assets/images/da.png" alt="">
             <span>医生答:</span>
           </div>
           <p class="answerp">
             {{item.answer}}
         </p>
         </div>
        </van-collapse-item>
      </van-collapse>
    </section>

  </main>
</template>

<script>
import axios from 'axios';
import { Toast } from 'vant';
export default {
  data() {
    return {
      curindex:0,
      activeNames: ['1'],
      message:'',
      res:'',
      unreplist:[],
      replist:[]
    };
  },
  methods:{
    onClickLeft() {
      this.$router.back();
    },
    handleTabClick(index){
      this.curindex = index;
    },
    addreply(item){
      if (this.message.length == 0) {
        Toast('请输入回复');
        return;
      }
      var params = {
        id:item.id,
        answer:this.message,
      }
      axios.post('/API/api/service/qaMeg/reply',params)
      .then(response => {
        Toast('回复成功');
        this.getdata();
      })
      .catch(error => {
        Toast('获取数据失败');
      });
    },
    getdata(){
      let userid = localStorage.getItem('userid');
      var params = {
        megOwner:this.megOwner,
        answerId:userid,
      }
      axios.post('/API/api/service/qaMeg/listQas',params)
      .then(response => {
        this.res = response.data;

        this.unreplist = [];
        this.replist = [];

        for (var i = 0; i < this.res.length; i++) {
          let item = this.res[i];
          if (item.isReply == 1) {
              this.replist.push(item);
          }else{
            this.unreplist.push(item);
          }
        }
      })
      .catch(error => {
        Toast('获取数据失败');
      });
    }
  },
  mounted(){
    this.megOwner = this.$route.query.megOwner;
    this.getdata();
  }
}
</script>

<style lang="css" scoped>
.daianswertitle img{
  width: 20px;
  height: 20px;
  vertical-align: text-bottom;
  display: inline-block;
}

.daianswer textarea{
  width: 100%;
}

.answertitle img{
  width: 20px;
  height: 20px;
  vertical-align: text-bottom;
  display: inline-block;
}
.answerrow img{
  width: 20px;
  height: 20px;
  vertical-align: text-bottom;
  display: inline-block;
}



.answerp{
  color: #9B9B9B;
  font-size: 14px;
}
.feedbtn{
  height: 44px;
  line-height: 44px;
  background-color: #37BEA9;
}
</style>
