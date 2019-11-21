<template lang="html">
  <main>
    <van-nav-bar
      title="我的医生"
      left-text=""
      left-arrow
      @click-left="onClickLeft"
    />

    <section>
      <div class="flexrow" v-for="item in res" :key="item.id">
        <div v-if="item.avatar">
          <img :src="picurl + item.avatar" alt="">
        </div>
        <div v-else>
          <img src="../../assets/images/pheader.png" alt="">
        </div>
        <div class="content">
          <p class="name">{{item.name}}<span>{{item.title}}</span></p>
          <p class="yiyuan">{{item.hospitalName}}<span>{{item.department}}</span></p>
          <p class="zhuangchang">医学专长:{{item.medSpecialty}}</p>
          <div class="btn">
            <van-button type="default" @click='toanswerpage(item)' v-if='item.status == 1'>咨询医生</van-button>
            <van-button type="default" @click='adddoc(item)' v-else>同意添加</van-button>
          </div>
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
      res:'',
      picurl:picUrlPrefix
    }
  },
  methods:{
    onClickLeft() {
      this.$router.back();
    },
    toanswerpage(item){
      this.$router.push({path:'/panswer',query: { answerId: item.id}});
    },
    adddoc(item){
      let userid = localStorage.getItem('userid');
      axios.post('/API/api/service/dpRel/update', {
        doctorId: item.id,
        patientId:parseInt(userid),
        status: 1,
        id:item.dpId
      })
      .then(response => {
        console.log(response.data);
        this.getdata();
        Toast('同意添加');
      })
      .catch(error => {
        Toast(error.response.data.message);
      });
    },

    getdata(){
      let userid = localStorage.getItem('userid');
      let api = 'API/api/service/dpRel/allDoclist/' + userid;
      axios.get(api)
      .then(response => {
        console.log(response.data);
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

main{
  background-color: #f5f5f5;
  min-height: 100vh;
}

section{
  margin-top: 10px;
}

.flexrow{
  display: flex;
  background-color: #fff;
  padding: 10px;
  margin-bottom: 10px;
}

.flexrow img{
  width: 60px;
  height: 60px;
  border-radius: 30px;
}

.content{
  flex:1;
  padding-left: 8px;
}

.content .name{
  font-size: 16px;
  margin: 6px 0;
}
.content .name span{
  font-size: 12px;
  padding-left: 8px;
  color: #9B9B9B;
}

.content .yiyuan{
  font-size: 14px;
  margin: 6px 0;
}
.content .yiyuan span{
  font-size: 12px;
  padding-left: 8px;
  color: #9B9B9B;
}
.content .zhuangchang{
  font-size: 14px;
  margin: 6px 0;
  color: #9B9B9B;
}
.content .btn{
  /* width: 100%; */
  text-align: right;
}

.content .btn button{
  font-size: 12px;
  height: 36px;
  line-height: 36px;
  color: #37BEA9;
  border-color: #37BEA9;
}


</style>
