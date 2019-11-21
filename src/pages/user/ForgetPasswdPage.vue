<template lang="html">
  <main>

    <van-nav-bar
      title="忘记密码"
      left-text=""
      left-arrow
      @click-left="onClickLeft"
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
          v-model="username"
          label="姓名"
          placeholder="请输入姓名"
          required
        />

        <van-field
          v-model="userid"
          label="身份证"
          placeholder="请输入身份证"
          required
        />

        <van-field
          v-model="tel"
          label="手机号"
          placeholder="请输入手机号"
          required
        />

        <van-field
          v-model="password"
          type="password"
          label="重置密码"
          placeholder="请输入重置密码"
          required
        />

        <van-field
          v-model="password2"
          type="password"
          label="确认密码"
          placeholder="请输入确认密码"
          required
        />


      </van-cell-group>


    </section>

    <section class="donesection">
      <van-button bottom-action class="donebtn" @click="resetPasswd()">提交</van-button>
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
      username:'',
      userid:'',
      tel:'',
      password:'',
      password2:''

    }
  },
  methods:{
    handleTabClick(index) {
      this.curindex = index;
      // Toast(this.curindex);
    },
    onClickLeft() {
      // Toast('返回');
      this.$router.back();
    },
    resetPasswd(){
      if (this.username == '') {
        Toast('输入姓名');
        return;
      }
      if (this.userid == '') {
        Toast('输入身份证');
        return;
      }
      if (this.tel == '') {
        Toast('输入手机号');
        return;
      }
      if (this.password == '') {
        Toast('输入密码');
        return;
      }
      if (this.password2 == '') {
        Toast('输入密码');
        return;
      }
      if (this.password != this.password2) {
        Toast('输入密码不一致');
        return;
      }




      axios.post('/API/api/service/user/findPwd', {
        name: this.username,
        cardNo:this.userid,
        phone:this.tel,
        newPwd: this.password,
        rePwd:this.password2,
        roleid: this.curindex == 0 ? 7 : 8
      })
      .then(response => {
        Toast('修改成功');
        this.$router.back();
      })
      .catch(error => {
        Toast('密码修改失败');
      });
    }

  }
}
</script>

<style lang="css" scoped>

  section{
    margin-top:10px;
  }
  .donesection{
    margin-top: 40px;
  }
  .donebtn{

    width: 94%;
    margin: 0 auto;
    display: block;
    height: 44px;
    line-height: 44px;
    background-color: #37BEA9;
  }

</style>
