<template lang="html">
  <main>

    <van-nav-bar
      title="注册"
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
          v-model="tel"
          label="手机号"
          placeholder="请输入手机号"
          required
        />
        <van-field
          v-model="password"
          type="password"
          label="登陆密码"
          placeholder="请输入登陆密码"
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

    <section v-show='curindex == 0'>
      <van-cell-group>
        <van-field
          v-model="username"
          label="姓名"
          placeholder="请输入姓名"
          required
        />

        <van-field
          v-model="age"
          label="年龄"
          placeholder="请输入年龄"
          required
        />

        <van-field
          v-model="userid"
          label="身份证"
          placeholder="请输入身份证"
          required
        />

        <van-field
          v-model="address"
          label="地址"
          placeholder="请输入地址"
          required
        />

        <van-field
          v-model="work"
          label="职位"
          placeholder="请输入职位"
        />

      </van-cell-group>

    </section>

    <section v-show='curindex == 1'>
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
          v-model="yiyuan"
          label="医院"
          placeholder="请输入医院"
          required
        />

        <van-field
          v-model="keshi"
          label="科室"
          placeholder="请输入科室"
          required
        />

        <van-field
          v-model="work"
          label="职位"
          placeholder="请输入职位"
          required
        />

        <van-field
          v-model="zhuangchang"
          label="医学专长"
          placeholder="请输入医学专长"
        />

      </van-cell-group>

    </section>

    <section class="donesection">
      <van-button bottom-action class="donebtn" @click='toregister()'>注册</van-button>
      <p class="login" @click='tologinpage()'>已有帐号?立即登陆</p>

      <p class='xieyi' @click='toxieyi()'>注册即表示同意 <span><<中亿乐康网用户协议>></span> </p>

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
      password2:'',

      username:'',
      age:'',
      userid:'',
      address:'',
      work:'',

      yiyuan:'',
      keshi:'',
      zhuangchang:''


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
    tologinpage(){
      this.$router.back();
    },
    toregister(){

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
      if (this.username == '') {
        Toast('输入姓名');
        return;
      }

      if (this.userid == '') {
        Toast('输入身份证');
        return;
      }



      if (this.curindex == 0) {
        if (this.age == '') {
          Toast('输入年龄');
          return;
        }
        if (this.address == '') {
          Toast('输入地址');
          return;
        }
      }
      else{
        if (this.yiyuan == '') {
          Toast('输入医院');
          return;
        }
        if (this.keshi == '') {
          Toast('输入科室');
          return;
        }
        if (this.work == '') {
          Toast('输入职位');
          return;
        }
      }

      if (this.curindex == 0) {

        axios.post('/API/api/service/user/register', {
          "user": {
             "account": this.tel,
             "password": this.password,
             "roleid": 7,
             "phone": this.tel,
             "name": this.username
           },
           "patientuser": {
            "mobile": this.tel,
            "username": this.username,
            "cardNo": this.userid,
            "permAddr": this.address,
            "title":this.work
          }
        })
        .then(response => {

          if (response.data.message == null){
            Toast('注册成功');
            this.tologin();
          }else{
            Toast(response.data.message);
          }


        })
        .catch(error => {
          Toast(error.response.data.message);
        });

      }

      else{

        axios.post('/API/api/service/user/register', {
        "user": {
           "account": this.tel,
           "password": this.password,
           "roleid": 8,
           "phone": this.tel,
           "name": this.username
         },
         "doctoruser": {
          "cardNo": this.userid,
          "department": this.keshi,
          "hospitalName": this.yiyuan,
          "medSpecialty": this.zhuangchang,
          "mobile": this.tel,
          "title": this.work,
          "username": this.username
        }
      })
      .then(response => {
        Toast('注册成功');
        this.tologin();
      })
      .catch(error => {
        Toast(error.response.data.message);
      });
      }

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
          if (this.curindex == 0) {
            this.$router.push({path:'/patient'});
          }else{
            this.$router.push({path:'/doctor'});
          }
        }else{
          Toast(error.response.data.message);
        }


      })
      .catch(error => {
        Toast('登陆失败');
      });
    },
    toxieyi(){
      this.$router.push({path:'/xieyi'});
    }

  }
}
</script>

<style lang="css" scoped>

  section{
    margin-top:10px;
  }
  .donesection{
    margin-top: 20px;
  }
  .donebtn{
    width: 94%;
    margin: 0 auto;
    display: block;
    height: 44px;
    line-height: 44px;
    background-color: #37BEA9;
  }
  .login{
    color:#9B9B9B;
    font-size: 14px;
    text-align: center;
  }

  .xieyi{
    text-align: center;
    font-size: 14px;
    color:#9B9B9B;
  }
  .xieyi span{
    color: #37BEA9;
  }

</style>
