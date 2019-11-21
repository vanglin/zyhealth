<template lang="html">
  <main>
    <van-nav-bar
      title="我的用户"
      left-text=""
      left-arrow
      @click-left="onClickLeft"
    />

    <section>
      <div class="flexrow">
        <div class="flexcol">
          <van-field
            v-model="name"
            label="用户名"
            placeholder="请输入用户名"
          />
          <van-field
            v-model="tel"
            label="手机号"
            placeholder="请输入手机号"
          />
        </div>
        <div class="flexcol2">
          <van-button type="default" class="searchbtn" @click="filteruser()">查询</van-button>
        </div>
      </div>
    </section>

    <section class="table">

      <van-row class="title">
        <van-col span="6" class="titlecell">姓名</van-col>
        <van-col span="6" class="titlecell">性别</van-col>
        <van-col span="6" class="titlecell">手机号</van-col>
        <van-col span="6" class="titlecell">详情</van-col>
      </van-row>

      <div v-for="item in filterres" :key="item.id">
        <van-row class="content">
          <van-col span="6" class="contentcell">
            <img :src="picurl + item.avatar" alt="" v-if="item.avatar">
            <img src="../../assets/images/dheader.png" alt="" v-else>
            <span>{{item.name}}</span>
          </van-col>
          <van-col span="6" class="contentcell">{{getsex(item.sex)}}</van-col>
          <van-col span="6" class="contentcell">{{item.phone}}</van-col>
          <van-col span="6" class="contentcell">
            <button type="button" name="button" @click='add(item)' v-if='item.version != 1'>添加</button>
          </van-col>
        </van-row>
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
      name:'',
      tel:'',
      res:'',
      filterres:[
      ],
      picurl:picUrlPrefix
    }
  },
  methods:{
    getsex(val){
      if (val == "1") {
        return '女';
      }else{
        return '男';
      }
    },
    onClickLeft() {
      this.$router.back();
    },

    searchuser(){
      this.$router.push({path:'dpatientsearch'});
    },
    add(item){
      let userid = localStorage.getItem('userid');
      axios.post('/API/api/service/dpRel/add', {
        doctorId: parseInt(userid),
        patientId:item.id,
        status: 2,
      })
      .then(response => {
        // console.log(response.data);
        Toast('请求成功');
      })
      .catch(error => {
        Toast(error.response.data.message);
      });
    },
    filteruser(){
      this.getdata()
    },
    getdata(){
      let userid = localStorage.getItem('userid');

      var params = {userId:userid};
      if (this.name != '') {
        params['name'] = this.name;
      }
      if(this.tel != ''){
        params['phone'] = this.tel;
      }

      axios.post('/API/api/service/user/getPatList', params)
      .then(response => {
        // console.log(response.data)
        this.res = response.data;
        this.filterres = this.res;
      })
      .catch(error => {
        Toast('获取数据失败');
      });
    }
  },
  mounted(){

  }
}
</script>

<style lang="css" scoped>

main{
  background-color: #f5f5f5;
  height: 100vh;
}

.flexrow{
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
}
.flexcol{
  flex:2;
}
.flexcol2{
  flex:1;

}

.addbtn{
  padding: 0px 20px;
  margin-top: 10px;
  height: 30px;
  line-height: 30px;
}

.table{
  margin-top: 10px;
}
.title{
  background-color: #37BEA9;
  padding: 10px;
}
.titlecell{
  color: #fff;
  font-size: 14px;
}

.titlecell:last-child{
  text-align: right;
}

.content{
  padding: 10px;
  background-color: #fff;
  border: 1px solid #e5e5e5;
}

.content .contentcell{
  font-size: 14px;
}
.content .contentcell:last-child{
  text-align:right;
}
.content .contentcell img{
  width:20px;
  height: 20px;
  display: inline-block;
  vertical-align:text-bottom;
}
</style>
