<template lang="html">
  <main>
    <van-nav-bar
      title="我的问答"
      left-text=""
      left-arrow
      @click-left="onClickLeft"
    />
    <section>
      <van-collapse v-model="activeNames" accordion>
        <van-collapse-item>
         <div slot="title" class="daianswertitle">
            <img src="../../assets/images/wen.png" alt="">
            <span>{{res.question}}</span>
         </div>
         <div class="daianswer">
          <textarea name="name" rows="8" cols="80" placeholder="请留言" v-model='message'></textarea>
          <van-button bottom-action class="feedbtn" @click="addreply()">回复</van-button>
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
      activeNames: ['1'],
      message:'',
      res:'',
      answerId:''
    };
  },
  methods:{
    onClickLeft() {
      this.$router.back();
    },
    handleTabClick(index){
      this.curindex = index;
    },
    addreply(){
      if (this.message.length == 0) {
        Toast('请输入回复');
        return;
      }
      var params = {
        id:this.res.id,
        answer:this.message,
      }
      axios.post('/API/api/service/qaMeg/reply',params)
      .then(response => {
        Toast('回复成功');
        this.$router.back();
      })
      .catch(error => {
        Toast('获取数据失败');
      });
    },
    getdata(){
      let api = 'API/api/service/qaMeg/detail/' + this.answerId;
      axios.get(api)
      .then(response => {
        this.res = response.data;
        this.message = this.res.answer;
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
