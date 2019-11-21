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
        <img src="../../assets/images/pheader.png" alt="">
      </div>

      <p v-if="res.user">{{res.user.name}}</p>
      <p v-if="res.patientuser">{{res.patientuser.age}}岁</p>
    </section>
    <div class="flexrow">
      <div class="flexcol" @click='tostatuspage()'>
        <img src="../../assets/images/pstatus.png" alt="">
        <p>当前状态</p>
      </div>
      <div class="flexcol" @click='tologpage()'>
        <img src="../../assets/images/prizi.png" alt="">
        <p>我的日志</p>
      </div>
    </div>
    <div class="flexrow">
      <div class="flexcol" @click='todoctorpage()'>
        <img src="../../assets/images/pdoctor.png" alt="">
        <p>我的医生</p>
      </div>
      <div class="flexcol" @click='toyaopage()'>
        <img src="../../assets/images/yao.png" alt="">
        <p>我的用药</p>
      </div>
    </div>
    <div class="flexrow">
      <div class="flexcol" @click='touserpage()'>
        <img src="../../assets/images/puser.png" alt="">
        <p>亲友关注</p>
      </div>
      <div class="flexcol" @click='tomessagepage()'>
        <img src="../../assets/images/pmessage.png" alt="">
        <p>我的消息 <span v-if='count != 0' class="message">{{count}}</span></p>
      </div>
    </div>
    <div class="flexrow">
      <div class="flexcol" @click='tosetting()'>
        <img src="../../assets/images/psetting.png" alt="">
        <p>个人资料</p>
      </div>
      <div class="flexcol" @click='todevicepage()'>
        <img src="../../assets/images/pdevice.png" alt="">
        <p>我的设备</p>
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
    tostatuspage(index) {
      this.$router.push({path:'/pstatus'});
    },
    tologpage(){
      this.$router.push({path:'/plog'});
    },
    todoctorpage(){
      this.$router.push({path:'/pdoctor'});
    },
    toyaopage(){
      this.$router.push({path:'/pdrug'});
    },
    todevicepage(){
      this.$router.push({path:'/pdevice'});
    },
    touserpage(){
      this.$router.push({path:'/puser'});
    },
    tomessagepage(){
      this.$router.push({path:'/pmessage'});
    },
    tosetting(){
      this.$router.push({path:'/psetting'});
    },
    getdata(){
      let userid = localStorage.getItem('userid');
      let api = 'API/api/service/user/view/' + userid;
      axios.get(api)
      .then(response => {
        // console.log(response);
        this.res = response.data;
        this.avatar = this.res.user.avatar;
        localStorage.setItem("userage",this.res.patientuser.age);

      })
      .catch(error => {
        Toast('获取数据失败');
      });
    },
    getmessagedata(){
      let userid = localStorage.getItem('userid');
      var params = {
        megOwner:userid
      }
      axios.post('API/api/service/qaMeg/unReadMeg/',params)
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
