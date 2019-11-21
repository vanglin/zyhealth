<template lang="html">
  <main>

    <van-nav-bar
      title="登陆"
    />

    <van-tabs @click="handleTabClick">
      <van-tab  :title="'用户'">
      </van-tab>
      <van-tab :title="'医生'">
      </van-tab>
    </van-tabs>

    <section>
      <van-cell-group>
        <van-field
          v-model="tel"
          label="手机号"
          placeholder="请输入手机号"
          required
        />

        <van-field
          v-model="password"
          type="password"
          label="密码"
          placeholder="请输入密码"
          required
        />
      </van-cell-group>
      <p class="forget_passwd" @click='topasswdpage()'>忘记密码?</p>
      <van-button bottom-action class="loginbtn" @click='tologin()'>登录</van-button>
      <p class="register" @click='toregisterpage()'>还没有帐号?立即注册</p>
    </section>

  </main>
</template>

<script>

import { Toast } from 'vant';
import axios from 'axios';
export default {
  data(){
    return{
      curindex:0,
      tel:'',
      password:'',
    }
  },
  methods:{
    handleTabClick(index) {
      this.curindex = index;
      // Toast(this.curindex);
    },
    topasswdpage(){
      this.$router.push({path:'/forgetpasswd'});
    },
    toregisterpage(){
      this.$router.push({path:'/register'});
    },
    tologin(){
      axios.post('/API/api/service/user/signin', {
        account: this.tel,
        password: this.password,
        roleid: this.curindex == 0 ? 7 : 8
      })
      .then(response => {

        if (response.data.message == null) {
          localStorage.setItem("userid",response.data.user.id);
          localStorage.setItem("account",this.tel);
          localStorage.setItem("password",this.password);
          localStorage.setItem("roleid",this.curindex == 0 ? 7 : 8);

          if (this.curindex == 0) {
            this.$router.push({path:'/patient'});
          }else{
            this.$router.push({path:'/doctor'});
          }

        }else{
          Toast(response.data.message);
        }


      })
      .catch(error => {
        // console.log(error);
        Toast(error.response.data.message);
      });
    },
    tologinuserpage(){
      let usertel = localStorage.getItem("account");
      let userpassword = localStorage.getItem("password");
      let userroleid = localStorage.getItem("roleid");
      axios.post('/API/api/service/user/signin', {
        account: usertel,
        password: userpassword,
        roleid: userroleid
      })
      .then(response => {

        if (response.data.message == null){
          localStorage.setItem("userid",response.data.user.id);
          if (userroleid == 7) {
            this.$router.push({path:'/patient'});
          }else{
            this.$router.push({path:'/doctor'});
          }
        }else{
          Toast(response.data.message);
        }

      })
      .catch(error => {
        Toast(error.response.data.message);
      });
    }
  },
  mounted(){
    let tel = localStorage.getItem("account");
    if (tel == null) {

    }else{
      this.tologinuserpage();
    }
  }
}
</script>

<style lang="css" scoped>

  section{
    margin-top:10px;
  }
  .forget_passwd{
    color:#37BEA9;
    font-size: 12px;
    text-align: right;
    margin-right: 10px;
  }
  .loginbtn{
    width: 94%;
    margin: 0 auto;
    display: block;
    height: 44px;
    line-height: 44px;
    background-color: #37BEA9;
  }
  .register{
    color:#9B9B9B;
    font-size: 14px;
    text-align: center;
  }

</style>
