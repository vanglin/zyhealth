<template lang="html">
  <main>

    <van-nav-bar
      :title='title'
      left-text=""
      left-arrow
      @click-left="onClickLeft"
      />

    <section>
      <van-cell-group>
        <van-field
          v-model="name"
          label="昵称"
          placeholder="请输入昵称"
          required
        />

        <van-field
          v-model="tel"
          label="手机"
          placeholder="请输入手机"
          required
        />
      </van-cell-group>

      <div class="btn">
        <van-button bottom-action class="addbtn" @click='tosave()'>{{btntitle}}</van-button>
      </div>


    </section>

  </main>
</template>

<script>

import axios from 'axios';
import { Toast } from 'vant';
export default {
  data(){
    return{
      tel:'',
      name:'',
      res:'',
      firstRelMobile:'',
      firstRelName:'',
      secondRelMobile:'',
      secondRelName:'',
      title:'添加亲友',
      btntitle:'添加',
      isedit:false,
      type:0
    }
  },
  methods:{
    onClickLeft() {
      this.$router.back();
    },
    getdata(){

      let userid = localStorage.getItem('userid');
      let api = 'API/api/service/user/view/' + userid;
      axios.get(api)
      .then(response => {

        this.res = response.data;
        this.firstRelMobile = this.res.patientuser.firstRelMobile;
        this.firstRelName = this.res.patientuser.firstRelName;
        this.secondRelMobile = this.res.patientuser.secondRelMobile;
        this.secondRelName = this.res.patientuser.secondRelName;

      })
      .catch(error => {
        Toast('获取数据失败');
      });
    },
    tosave(){

      if (this.isedit) {

        if (this.type == 1) {
          this.firstRelName = this.name;
          this.firstRelMobile = this.tel;

          if (this.firstRelName.length == 0 || this.firstRelMobile.length == 0) {
            Toast('输入格式不正确');
            return;
          }
        }
        else{
          this.secondRelName = this.name;
          this.secondRelMobile = this.tel;
          if (this.secondRelName.length == 0 || this.secondRelMobile.length == 0) {
            Toast('输入格式不正确');
            return;
          }
        }
      }

      else{

        if (this.firstRelName == '') {
        this.firstRelName = this.name;
        this.firstRelMobile = this.tel;

        if (this.firstRelName.length == 0 || this.firstRelMobile.length == 0) {
          Toast('输入格式不正确');
          return;
        }
      }

      else{
        this.secondRelName = this.name;
        this.secondRelMobile = this.tel;
        if (this.secondRelName.length == 0 || this.secondRelMobile.length == 0) {
          Toast('输入格式不正确');
          return;
        }
      }

      }
      
      var params = {
          doctoruser: "",
          patientuser: {
            firstRelMobile:this.firstRelMobile,
            firstRelName:this.firstRelName,
            secondRelMobile:this.secondRelMobile,
            secondRelName:this.secondRelName
          },
          user: {
            account: this.res.user.account,
            roleid: this.res.user.roleid,
            id: this.res.user.id,
          }
      }

      axios.post('/API/api/service/user/edit',params)
      .then(response => {

        if (this.isedit) {
          Toast('修改成功');
        }else{
          Toast('添加成功');
        }

        this.$router.back();
      })
      .catch(error => {
        if (this.isedit) {
          Toast('修改失败');
        }else{
          Toast('添加失败');
        }
      });

    },

  },
  mounted(){
    this.getdata();
    this.name = this.$route.query.name;
    this.tel = this.$route.query.tel;
    this.type = this.$route.query.type;
    if (this.name.length > 0) {
      this.title = '修改亲友';
      this.btntitle = '修改';
      this.isedit = true;
    }
  }
}
</script>

<style lang="css" scoped>

.btn{
  margin-top: 20px;
}

.addbtn{
  width: 94%;
  margin: 0 auto;
  display: block;
  height: 44px;
  line-height: 44px;
  background-color: #37BEA9;
}


</style>
