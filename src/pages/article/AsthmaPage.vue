<template lang="html">
  <main>
    <van-nav-bar
      title="哮喘"
    />
    <section>

      <van-list
      v-model="loading"
      :finished="finished"
      @load="onLoad"
      >
      <div v-for="item in this.list" :key="item.id">
        <div @click='todetailpage(item)'>
          <van-card class="card"
            :title=item.title
            :thumb="getimgurl(item.titleImg)"
            >
          </van-card>
        </div>
      </div>

    </van-list>

    </section>

  </main>
</template>

<script>

import axios from 'axios';
import { Toast } from 'vant';
import { List } from 'vant';
import {picUrlPrefix} from '../../Global.js';
export default {
  data(){
    return{
      start:0,
      list:[],
      loading: false,
      finished: false,
    }
  },
  methods:{
      getimgurl(url){
        if (url == undefined) {
          return "";
        }else{

          if (url.indexOf('http') == -1) {
            return picUrlPrefix + url;
          }else{
            return url;
          }
        }
      },
      todetailpage(item){

        if (item.outlink == undefined || item.outlink.indexOf('http') == -1) {
          localStorage.setItem('article',JSON.stringify(item));
          this.$router.push({path:'/articledetail'});
        }else{
          window.location.href = item.outlink;
        }

      },
      onLoad(){
        this.getdata();
      },
      getdata(){
        axios.post('/API/api/service/news/seclist', {
          num: 10,
          start: this.start,
          newsType:1
        })
        .then(response => {
          this.loading = false;
          if (response.data.length < 10) {
            this.finished = true;
          }else{
            this.start += 10;
          }

          if (response.data.length > 0) {
            this.list.push(...response.data);
          }
        })
        .catch(error => {
          Toast('获取数据失败');
        });
      }
  }
}
</script>

<style lang="css" scoped>
main{
  background-color: #f5f5f5;
}
.swipe{
  height: 160px;
}
.swipeimg{
  height: 160px;
  width: 100%;
  display: block;
  box-sizing: border-box;
  /* padding: 30px 60px; */
}
.flexrow{
  background-color: #ffffff;
  margin-top: 10px;
  display: flex;
  padding: 0 10px;
  align-items: center;
  border-bottom: 1px solid #e5e5e5;
  /* justify-content: center; */
}
.flexrow img{
  width: 14px;
  height: 18px;
}
.flexrow p{
  margin-left: 8px;
  font-size: 14px;
}
.card{
  background: #ffffff;
  margin-top: 0px;
  margin-bottom: 0px;
  border-bottom: 1px solid #e5e5e5;
}

</style>
