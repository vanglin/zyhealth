<template lang="html">
  <main>
    <van-nav-bar
      title="可用药列表"
      left-text=""
      left-arrow
      @click-left="onClickLeft"
    />

    <div class="flexrow">
      <input type="text" name="name" value="name" v-model="name">
      <van-button type="default" class="searchbtn" @click="filterdrug()">查询</van-button>
    </div>


    <van-cell-group v-for="(item,index) in filteres" :key="item.id">
      <div class='flexrow'>
        <div class="van-cell__title" @click='todrugdetail(item)'><span>{{item.drug}}</span></div>
        <p @click='changedrug(item)'>添加</p>
        <i class="van-icon van-icon-arrow van-cell__right-icon"></i>
      </div>

      <!-- <van-cell :title='item.drug' is-link @click='todrugdetail(item)' /> -->
    </van-cell-group>

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
    changedrug(item){
      let drug = localStorage.getItem('pdrug');
      if (drug != null) {
        let drugitem = JSON.parse(drug);

        drugitem.drugId = item.id;
        drugitem.drug = item.drug;
        drugitem.altercol = item.altercol;
        drugitem.functionDescript = item.functionDescript;
        drugitem.treatSymptoms = item.treatSymptoms;
        drugitem.advEffect = item.advEffect;
        drugitem.dosageManage = item.dosageManage;

        localStorage.setItem("pdrug",JSON.stringify(drugitem));
      }else{
        item.isedit = false;
        item.drugAltercol = item.altercol;
        item.drugId = item.id;
        localStorage.setItem("pdrug",JSON.stringify(item));
      }
      this.$router.push({path:'/pdrugdetail'});
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
      localStorage.setItem("selectdrug",JSON.stringify(item));
      this.$router.push({path:'/pdrugselectdetail'});
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
  padding: 0 10px;
  border-bottom: 1px solid #eee;
}

.flexrow input{
  flex: 1;
  border: 0;
  font-size: 14px;
  padding-left: 15px;
}


</style>
