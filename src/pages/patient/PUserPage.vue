<template lang="html">
  <main>
    <van-nav-bar
      title="亲友关注"
      left-text=""
      left-arrow
      @click-left="onClickLeft"
    />

    <div class="flexrow" v-show="firstRelName != ''">
      <p class="name">{{firstRelName}}</p>
      <p class="tel">{{firstRelMobile}}</p>
      <img class="editimg" src="../../assets/images/edit.png" alt="" @click="toeditpage(firstRelName,firstRelMobile,1)">

    </div>

    <div class="flexrow" v-show="secondRelName != ''">
      <p class="name">{{secondRelName}}</p>
      <p class="tel">{{secondRelMobile}}</p>
      <img class="editimg" src="../../assets/images/edit.png" alt="" @click="toeditpage(secondRelName,secondRelMobile,2)">
    </div>

    <div class="btn" v-show="firstRelName == '' || secondRelName == ''">
      <van-button bottom-action class="addbtn" @click="toaddpage()">添加</van-button>
    </div>

  </main>
</template>

<script>
import axios from 'axios';
import { Toast } from 'vant';
export default {
  data(){
    return{
      res:'',
      firstRelMobile:'',
      firstRelName:'',
      secondRelMobile:'',
      secondRelName:'',

    }
  },
  methods:{
    onClickLeft() {
      this.$router.back();
    },
    toaddpage(){
      this.$router.push({path:'/padduser'});
    },
    toeditpage(name,mobile,type){
      this.$router.push({path:'/padduser',query: { name: name,tel:mobile,type:type }});
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
  },
  mounted(){
    this.getdata();
  }
}
</script>

<style lang="css" scoped>

main{
  min-height: 100vh;
  background-color: #f5f5f5;
}

.flexrow{
  display: flex;
  padding:0 10px;
  background-color: #fff;
  align-items: center;
  border-bottom: 1px solid #e5e5e5;
  /* justify-content: flex-end; */
}

.flexrow .editimg{
  width: 32px;
  height: 32px;
}
.flexrow .delimg{
  width: 32px;
  height: 32px;
}

.flexrow .name{
  flex: 1;
  font-size: 16px;
  margin: 0;
  padding: 0;
}

.flerow .tel{
  font-size: 14px;
  margin: 0;
  padding: 0;
}

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
