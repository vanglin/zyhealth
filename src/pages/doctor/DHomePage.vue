<template lang="html">
  <main>
    <van-nav-bar
      title="我的乐康"
    />
    <section>
      <div v-if="this.avatar != ''">
        <img :src="this.picurl + this.avatar" alt="">
      </div>
      <div v-else>
        <img src="../../assets/images/dheader.png" alt="">
      </div>
      <p v-if="res.doctoruser">{{res.doctoruser.username}}</p>

    </section>
    <div class="flexrow">
      <div class="flexcol" @click='topatientpage()'>
        <img src="../../assets/images/dpatient.png" alt="">
        <p>我的用户</p>
      </div>
      <div class="flexcol" @click='tomessagepage()'>
        <img src="../../assets/images/dmessage.png" alt="">
        <p>我的消息 <span v-if='count != 0' class="message">{{count}}</span></p>
      </div>
    </div>
    <div class="flexrow">
      <div class="flexcol" @click='toyaopage()'>
        <img src="../../assets/images/yao.png" alt="">
        <p>我的用药</p>
      </div>
      <div class="flexcol" @click='tosetting()'>
        <img src="../../assets/images/dsetting.png" alt="">
        <p>个人中心</p>
      </div>

    </div>
    <van-button bottom-action class="logoutbtn" @click='tologout()'>退出</van-button>
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
      avatar:'',
      picurl:picUrlPrefix,
      count:0
    }
  },
  methods:{
    topatientpage(index) {
      this.$router.push({path:'/dpatient'});
    },
    tomessagepage(){
      this.$router.push({path:'/dmessage'});
    },
    toyaopage(){
      this.$router.push({path:'/ddrug'});
    },
    tosetting(){
      this.$router.push({path:'/dsetting'});
    },
    getdata(){
      let userid = localStorage.getItem('userid');
      let api = 'API/api/service/user/view/' + userid;
      axios.get(api)
      .then(response => {
        this.res = response.data;
        this.avatar = this.res.user.avatar;
        localStorage.setItem('docname',this.res.doctoruser.username);
      })
      .catch(error => {
        Toast('获取数据失败');
      });
    },
    getmessagedata(){
      let userid = localStorage.getItem('userid');
      var params = {
        answerId:userid,
        isReply:0
      }
      axios.post('/API/api/service/qaMeg/listQas',params)
      .then(response => {
        let res = response.data;
        this.count = res.length;

      })
      .catch(error => {
        Toast('获取数据失败');
      });
    },
    tologout(){
      localStorage.removeItem("userid");
      localStorage.removeItem("account");
      localStorage.removeItem("password");
      localStorage.removeItem("roleid");
      localStorage.removeItem("docname");
      this.$router.back();
    }
  },
  mounted(){
    this.getdata();
    this.getmessagedata();
  }
}
</script>

<style lang="css" scoped>

main{
  background-color: #F5F5F5;
  min-height: 100vh;
}

section{
  height: 160px;
  background-color: #37BEA9;
  text-align: center;
}
section img{
  margin-top: 30px;
  display: inline-block;
  width: 60px;
  height: 60px;
  border-radius: 30px;
}
section p{
  color: #fff;
  margin: 0;
}


.flexrow{
  display: flex;
  /* background-color: #fff; */
  text-align: center;
  /* padding:10px 10px 0 0; */
  /* border:1px solid #e5e5e5; */

}
.flexcol{
  flex: 1;
  margin: 4px;
  box-sizing: border-box;
  background-color: #fff;
}
.flexcol img{
  padding:20px 0 0 0;
  width: 30px;
  height: 30px;
}
.flexhidden{
  background-color: #F5F5F5;
}

.logoutbtn{
  width: 94%;
  margin: 10px auto;
  display: block;
  height: 44px;
  line-height: 44px;
  background-color: #37BEA9;
}
.message{
  color: #E12A37;
}

</style>
