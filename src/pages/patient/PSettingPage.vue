<template lang="html">
  <main>
    <van-nav-bar
      title="个人资料"
      left-text=""
      left-arrow
      @click-left="onClickLeft"
    />

    <van-cell-group class="headcell">

      <div class="flexrow">
        <label for="icon" class="iconlabel">头像</label>
        <van-uploader :after-read="onRead">
          <div v-if="this.avatar != ''">
            <img :src="this.picurl + this.avatar" alt="">
          </div>
          <div v-else>
            <img src="../../assets/images/pheader.png" alt="">
          </div>
        </van-uploader>
      </div>

    </van-cell-group>

    <van-cell-group>

      <div class="flexrow">
        <label for="name">姓名</label>
        <input type="text" name="name" value="name" v-model="name">
      </div>

      <div class="flexrow">
        <label for="age">年龄</label>
        <input type="text" name="age" value="age" v-model="age">
      </div>

      <div class="flexrow">
        <label for="cardNo">身份证</label>
        <input type="text" name="cardNo" value="cardNo" v-model="cardNo">
      </div>

      <div class="flexrow">
        <label for="permAddr">地址</label>
        <input type="text" name="permAddr" value="permAddr" v-model="permAddr">
      </div>


      <!-- <div class="flexrow">
        <label for="title">职位</label>
        <input type="text" name="title" value="title" v-model="title">
      </div> -->

      <div class="flexrow">
        <label for="mobile">手机号</label>
        <input type="text" name="mobile" value="mobile" v-model="mobile">
      </div>


    </van-cell-group>

    <div class="btn">
      <van-button bottom-action class="savebtn" @click='tosave()'>保存资料</van-button>
    </div>


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
      name:'',
      age:'',
      cardNo:'',
      permAddr:'',
      title:'',
      mobile:'',
      premobile:'',
      avatar:'',
      picurl:picUrlPrefix
    }
  },
  methods:{

    onRead(file){

      Toast.loading({
        mask: true,
        message: '上传中...',
        duration:0
      });
      let formdata = new FormData();
  	  formdata.append('file',file.file);
      axios.post('/API/api/service/user/upload',formdata,{headers: {'Content-Type': 'multipart/form-data'}}).then( (response) => {

        this.avatar = response.data.pictureName;
        Toast.clear();
      }).catch((error) =>{
        Toast.clear();
        Toast('上传图片失败');
      });

    },
    onClickLeft() {
      this.$router.back();
    },
    getdata(){
      let userid = localStorage.getItem('userid');
      let api = 'API/api/service/user/view/' + userid;
      axios.get(api)
      .then(response => {

        this.res = response.data;
        this.name = this.res.user.name;
        this.age = this.res.patientuser.age;
        this.cardNo = this.res.patientuser.cardNo;
        this.permAddr = this.res.patientuser.permAddr;
        this.title = this.res.patientuser.title;
        this.mobile = this.res.patientuser.mobile;
        this.premobile = this.mobile;
        this.avatar = this.res.user.avatar;

      })
      .catch(error => {
        Toast('获取数据失败');
      });
    },
    tosave(){

      var params;
      if (this.premobile == this.mobile) {
        params = {
          doctoruser: "",
          patientuser: {
            age:this.age,
            cardNo: this.cardNo,
            permAddr: this.permAddr,

          },
          user: {
            avatar:this.avatar,
            account: this.res.user.account,
            roleid: this.res.user.roleid,
            id: this.res.user.id,
            username: this.name
          }
        }
      }
      else{
        params = {
          doctoruser: "",
          patientuser: {
            age:this.age,
            cardNo: this.cardNo,
            mobile: this.mobile,
            permAddr: this.permAddr,

          },
          user: {
            avatar:this.avatar,
            account: this.res.user.account,
            roleid: this.res.user.roleid,
            phone:this.mobile,
            id: this.res.user.id,
            username: this.name
          }
        }
      }

      axios.post('/API/api/service/user/edit',params)
      .then(response => {
        Toast('修改成功');
      })
      .catch(error => {
        Toast('修改失败');
      });
    }
  },
  mounted(){
    this.getdata();
  }
}
</script>

<style lang="css" scoped>

.iconlabel{
  flex:1;
}
.headcell{
  margin-bottom: 20px;
}
.headcell img{
  width: 40px;
  height: 40px;
  border-radius: 20px;
}


.flexrow{
  display: flex;
  align-items: center;
  padding: 10px 15px;
  border-bottom: 1px solid #eee;

}

.flexrow label{
  font-size: 14px;

}
.flexrow input{
  flex: 1;
  text-align: right;
  border: 0;
}

.btn{
  margin-top: 20px;
}

.savebtn{

  width: 94%;
  margin: 0 auto;
  display: block;
  height: 44px;
  line-height: 44px;
  background-color: #37BEA9;
}

</style>
