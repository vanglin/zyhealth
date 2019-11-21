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
            <img src="../../assets/images/dheader.png" alt="">
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
        <label for="cardNo">身份证</label>
        <input type="text" name="cardNo" value="cardNo" v-model="cardNo">
      </div>

      <div class="flexrow">
        <label for="hospitalName">医院</label>
        <input type="text" name="hospitalName" value="hospitalName" v-model="hospitalName">
      </div>

      <div class="flexrow">
        <label for="department">科室</label>
        <input type="text" name="department" value="department" v-model="department">
      </div>

      <div class="flexrow">
        <label for="title">职位</label>
        <input type="text" name="title" value="title" v-model="title">
      </div>

      <div class="flexrow">
        <label for="medSpecialty">医学专长</label>
        <input type="text" name="medSpecialty" value="medSpecialty" v-model="medSpecialty">
      </div>

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
      cardNo:'',
      hospitalName:'',
      department:'',
      title:'',
      medSpecialty:'',
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
        this.cardNo = this.res.doctoruser.cardNo;
        this.hospitalName = this.res.doctoruser.hospitalName;
        this.department = this.res.doctoruser.department;
        this.medSpecialty = this.res.doctoruser.medSpecialty;
        this.title = this.res.doctoruser.title;
        this.mobile = this.res.doctoruser.mobile;
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
          doctoruser: {
            cardNo: this.cardNo,
            hospitalName:this.hospitalName,
            department:this.department,
            medSpecialty:this.medSpecialty,
            title:this.title
          },
          patientuser: "",
          user: {
            avatar:this.avatar,
            account: this.res.user.account,
            roleid: this.res.user.roleid,
            id: this.res.user.id,
            name: this.name,
          }
        }
      }else{
        params = {
          doctoruser: {
            cardNo: this.cardNo,
            mobile: this.mobile,
            hospitalName:this.hospitalName,
            department:this.department,
            medSpecialty:this.medSpecialty,
            title:this.title
          },
          patientuser: "",
          user: {
            avatar:this.avatar,
            account: this.res.user.account,
            roleid: this.res.user.roleid,
            phone:this.mobile,
            id: this.res.user.id,
            name: this.name,
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
