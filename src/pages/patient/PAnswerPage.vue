<template lang="html">
  <main>
    <van-nav-bar
      title="我的提问"
      left-text=""
      left-arrow
      @click-left="onClickLeft"
    />

    <van-tabs @click="handleTabClick">
      <van-tab  :title="'提回'">
      </van-tab>
      <van-tab :title="'已回复'">
      </van-tab>
    </van-tabs>

    <section v-show='curindex == 0'>
      <div class="daianswer">
        <textarea name="name" rows="8" cols="80" placeholder="请提问" v-model='message'></textarea>
        <div class="btn">
          <van-button bottom-action class="feedbtn" @click="addquestion()">提问</van-button>
        </div>
      </div>
    </section>

    <section v-show='curindex == 1'>
      <van-collapse v-model="activeNames" accordion>
        <van-collapse-item v-for="item in res" :key="item.id">
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
      answerId:'',
      message:'',
      res:''
    };
  },
  methods:{
    onClickLeft() {
      this.$router.back();
    },
    handleTabClick(index){
      this.curindex = index;
    },
    addquestion(){
      if (this.message.length == 0) {
        Toast('请输入提问内容');
        return;
      }
      let userid = localStorage.getItem('userid');
      var params = {
        megOwner:userid,
        answerId:this.answerId,
        question:this.message
      }
      axios.post('/API/api/service/qaMeg/add',params)
      .then(response => {
        Toast('提问成功');
      })
      .catch(error => {
        Toast('提问失败');
      });
    },
    getdata(){
      let userid = localStorage.getItem('userid');
      var params = {
        megOwner:userid,
        answerId:this.answerId,
        isReply:1
      }
      axios.post('/API/api/service/qaMeg/listQas',params)
      .then(response => {
        this.res = response.data;
      })
      .catch(error => {
        Toast('获取数据失败');
      });
    }
  },
  mounted(){
    this.answerId = this.$route.query.answerId;
    this.getdata();
  }
}
</script>

<style lang="css" scoped>

main{
  background-color: #f5f5f5;
  min-height: 100vh;
}

.daianswer{
  margin: 0 auto;
  width: 94%;
}

.daianswer textarea{
  width: 100%;
  margin-top: 10px;
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

.btn{

  /* margin: 0 auto; */
  /* width:94%; */

}
.feedbtn{
  margin-top: 20px;
  height: 44px;
  line-height: 44px;
  background-color: #37BEA9;
}
</style>
