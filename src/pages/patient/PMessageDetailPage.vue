<template lang="html">
  <main>
    <van-nav-bar
      title="我的提问"
      left-text=""
      left-arrow
      @click-left="onClickLeft"
    />

    <section>
      <van-collapse v-model="activeNames" accordion>
        <van-collapse-item>
         <div slot="title" class="answertitle">
            <img src="../../assets/images/wen.png" alt="">
            <span>{{res.question}}</span>
         </div>
         <div class="answer">
           <div class="answerrow">
             <img src="../../assets/images/da.png" alt="">
             <span>医生答:</span>
           </div>
           <p class="answerp">
             {{res.answer}}
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
      activeNames: ['1'],
      answerId:'',
      res:''
    };
  },
  methods:{
    onClickLeft() {
      this.$router.back();
    },

    getdata(){

      let api = 'API/api/service/qaMeg/readAnswer/' + this.answerId;
      axios.get(api)
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

</style>
