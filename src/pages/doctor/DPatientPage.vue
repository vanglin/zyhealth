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
          <van-button type="default" class='addbtn' plain @click='searchuser()'>添加</van-button>
        </div>
      </div>
    </section>

    <section class="table">

      <van-row class="title">
        <van-col span="6" class="titlecell">姓名</van-col>
        <van-col span="6" class="titlecell">年龄</van-col>
        <van-col span="6" class="titlecell">手机号</van-col>
        <van-col span="6" class="titlecell">详情</van-col>
      </van-row>

      <div v-for="item in filterres" :key="item.id" @click="topatientdetail(item)">
        <van-row class="content">
          <van-col span="6" class="contentcell">
            <img :src="picurl + item.avatar" alt="" v-if="item.avatar">
            <img src="../../assets/images/dheader.png" alt="" v-else>
            <span>{{item.name}}</span>
          </van-col>
          <van-col span="6" class="contentcell">{{item.age ? item.age : 0}}</van-col>
          <van-col span="6" class="contentcell">{{item.mobile}}</van-col>
          <van-col span="6" class="contentcell">></van-col>
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
      filterres:'',
      picurl:picUrlPrefix
    }
  },
  methods:{
    onClickLeft() {
      this.$router.back();
    },
    topatientdetail(item){
      this.$router.push({path:'/dpatientdetail',query: { megOwner: item.id}});
    },
    searchuser(){
      this.$router.push({path:'dpatientsearch'});
    },
    filteruser(){

      if (this.name == '' && this.tel == '') {
        this.filterres = this.res;
        return;
      }

      var res = [];
      for (var i = 0; i < this.filterres.length; i++) {
        let item = this.filterres[i];
        if (item.name == this.name || item.mobile == this.tel) {
          res.push(item);
        }
      }
      this.filterres = res;
    },
    getdata(){
      let userid = localStorage.getItem('userid');
      let api = 'API/api/service/dpRel/patlist/' + userid;
      axios.get(api)
      .then(response => {
        this.res = response.data;
        this.filterres = this.res;
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
.searchbtn{
  color: #37BEA9;
  border-color: #37BEA9;
  padding: 0px 20px;
  height: 30px;
  line-height: 30px;
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
