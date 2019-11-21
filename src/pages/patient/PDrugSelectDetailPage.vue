<template lang="html">
  <main>
    <van-nav-bar
      title="用药详情"
      left-text=""
      left-arrow
      @click-left="onClickLeft"
    />

    <van-cell-group>


      <div class="flexrow">
        <label for="drug">名称</label>
        <p>{{this.drug}}</p>
      </div>

      <div class="flexrow">
        <label for="altercol">类型</label>
        <p>{{this.altercol}}</p>
      </div>

      <div class="flexrow">
        <label for="functionDescript">描述</label>
        <p>{{this.functionDescript}}</p>
      </div>

      <div class="flexrow">
        <label for="treatSymptoms">症状</label>
        <p>{{this.treatSymptoms}}</p>
      </div>

      <div class="flexrow">
        <label for="advEffect">规格</label>
        <p>{{this.advEffect}}</p>
      </div>

      <div class="flexrow">
        <label for="dosageManage">用量用法</label>
        <p>{{this.dosageManage}}</p>
      </div>



    </van-cell-group>




  </main>
</template>

<script>
import axios from 'axios';
import { Toast } from 'vant';
import moment from "moment";
export default {
  data(){
    return{
      drugid:'',
      drug:'',
      altercol:'',
      functionDescript:'',
      treatSymptoms:'',
      advEffect:'',
      dosageManage:'',

      // supplier:''
      isedit:false,

    }
  },
  methods:{

    onClickLeft() {
      this.$router.back();
    },

  },
  mounted(){
    let drug = localStorage.getItem('selectdrug');
    if (drug != null) {
      let item = JSON.parse(drug);
      this.drugid = item.drugId;
      this.drug = item.drug;
      this.altercol = item.altercol;
      this.functionDescript = item.functionDescript;
      this.treatSymptoms = item.treatSymptoms;
      this.advEffect = item.advEffect;
      this.dosageManage = item.dosageManage;
      // localStorage.removeItem('pdrug');
    }
  }
}
</script>

<style lang="css" scoped>

.flexrow{
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 10px 15px;
  border-bottom: 1px solid #eee;
}

.flexrow label{
  font-size: 14px;
}

.flexrow p{
  padding: 0;
  margin: 0;
  flex: 1;
  text-align: right;
  border: 0;
  font-size: 14px;
}

.flexrow input{
  flex: 1;
  text-align: right;
  border: 0;
  font-size: 14px;
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

.editbtn{
  width: 94%;
  margin: 0 auto;
  display: block;
  height: 44px;
  line-height: 44px;
  background-color: #37BEA9;
}

.delbtn{
  width: 94%;
  margin: 0 auto;
  display: block;
  height: 44px;
  line-height: 44px;
  margin-top: 10px;
  background-color: #f44;
}



</style>
