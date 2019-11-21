<template lang="html">
  <main>
    <van-nav-bar
      title="用药列表"
      left-text=""
      left-arrow
      @click-left="onClickLeft"
    />

    <div class="flexrow">
      <input type="text" name="name" value="name" v-model="name">
      <van-button type="default" class="searchbtn" @click="filterdrug()">查询</van-button>
    </div>


    <van-cell-group v-for="(item,index) in filteres" :key="item.id">
      <van-cell :title='item.drug' is-link @click='todrugdetail(item)' />
    </van-cell-group>

    <van-button bottom-action class="addbtn" @click='add()'>新增用药</van-button>
  </main>
</template>

<script>
import axios from 'axios';
import { Toast } from 'vant';

export default {
  data(){
    return{
      res:[],
      filteres:[],
      name:''

    }
  },
  methods:{
    onClickLeft() {
      this.$router.back();
    },
    filterdrug(){
      // console.log('filterdrug');
      if(this.name == ''){
        this.filteres = this.res;
      }else{
        this.filteres = [];
        for (var i = 0; i < this.res.length; i++) {
          let item = this.res[i];
          if(item.drug.indexOf(this.name) !== -1){
            this.filteres.push(item);
          }
        }
      }

    },
    todrugdetail(item){
      localStorage.setItem("drug",JSON.stringify(item));
      this.$router.push({path:'/ddrugdetail'});
    },
    add(){
      this.$router.push({path:'/ddrugdetail'});
    },
    getdata(){

      let api = 'API/api/service/drug/list';
      axios.get(api)
      .then(response => {
        this.res = response.data;
        this.filteres = this.res;

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
.addbtn{
  width: 94%;
  margin: 0 auto;
  display: block;
  height: 44px;
  line-height: 44px;
  background-color: #37BEA9;
}

.flexrow{
  display: flex;
  align-items: center;
  border-bottom: 1px solid #eee;
}

.flexrow input{
  flex: 1;
  border: 0;
  font-size: 14px;
  padding-left: 15px;
}


</style>
