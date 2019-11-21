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
        <input type="text" name="drug" value="drug" v-model="drug">
      </div>

      <div class="flexrow">
        <label for="altercol">类型</label>
        <input type="text" name="altercol" value="altercol" v-model="altercol">
      </div>

      <div class="flexrow">
        <label for="functionDescript">描述</label>
        <textarea name="functionDescript" rows="2"  v-model="functionDescript"></textarea>
        <!-- <input type="text" name="functionDescript" value="functionDescript" v-model="functionDescript"> -->
      </div>

      <div class="flexrow">
        <label for="treatSymptoms">症状</label>
        <textarea name="name" rows="3"  v-model="treatSymptoms"></textarea>

      </div>

      <div class="flexrow">
        <label for="advEffect">规格</label>
        <input type="text" name="advEffect" value="advEffect" v-model="advEffect">
      </div>

      <div class="flexrow">
        <label for="dosageManage">用量用法</label>
        <input type="text" name="dosageManage" value="dosageManage" v-model="dosageManage">
      </div>

    </van-cell-group>

    <div class="btn" v-if='isedit == false'>
      <van-button bottom-action class="addbtn" @click='adddrug()'>新增</van-button>
    </div>

    <div class="btn" v-else>
      <van-button bottom-action class="editbtn" @click='editdrug()'>修改</van-button>
      <van-button bottom-action class="delbtn" @click='deldrug()'>删除</van-button>
    </div>


  </main>
</template>

<script>
import axios from 'axios';
import { Toast,Dialog } from 'vant';
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

    adddrug(){
      if (this.drug == '' || this.altercol == '' || this.functionDescript == '' || this.treatSymptoms == '' || this.advEffect == '' || this.dosageManage == '') {
        Toast('请完善数据');
        return;
      }
      let params = {
        "drug": this.drug,
        "advEffect": this.advEffect,
        "altercol": this.altercol,
        "createTime": moment().format('YYYY-MM-DD HH:mm:ss'),
        "dosageManage": this.dosageManage,
        "functionDescript": this.functionDescript,
        "treatSymptoms":this.treatSymptoms,
        "supplier":localStorage.getItem('docname')
      }
      axios.post('/API/api/service/drug/add',params)
      .then(response => {
        this.$router.push({path:'/ddrug'});
        Toast('新增成功');
      })
      .catch(error => {
        Toast('新增失败');
      });


    },
    editdrug(){
      if (this.drug == '' || this.altercol == '' || this.functionDescript == '' || this.treatSymptoms == '' || this.advEffect == '' || this.dosageManage == '') {
        Toast('请完善数据');
        return;
      }
      let params = {
        "id":this.drugid,
        "drug": this.drug,
        "advEffect": this.advEffect,
        "altercol": this.altercol,
        "createTime": moment().format('YYYY-MM-DD HH:mm:ss'),
        "dosageManage": this.dosageManage,
        "functionDescript": this.functionDescript,
        "treatSymptoms":this.treatSymptoms,
        "supplier":localStorage.getItem('docname')
      }
      axios.post('/API/api/service/drug/update',params)
      .then(response => {
        Toast('修改成功');
      })
      .catch(error => {
        Toast('修改失败');
      });

    },
    deldrug(){

      Dialog.confirm({
        title: '提醒',
        message: '确定要删除吗？'
      }).then(() => {
        // on confirm
        let api = '/API/api/service/drug/delete/' + this.drugid;
        axios.get(api)
        .then(response => {
          Toast('删除成功');
          this.$router.back();
        })
        .catch(error => {
          Toast('删除失败');
        });
      }).catch(() => {
        // on cancel
      });


    }
  },
  mounted(){
    let drug = localStorage.getItem('drug');
    if (drug != null) {
      let item = JSON.parse(drug);
      this.drugid = item.id;
      this.drug = item.drug;
      this.altercol = item.altercol;
      this.functionDescript = item.functionDescript;
      this.treatSymptoms = item.treatSymptoms;
      this.advEffect = item.advEffect;
      this.dosageManage = item.dosageManage;
      this.isedit = true;
      localStorage.removeItem('drug');
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

.flexrow input{
  flex: 1;
  text-align: right;
  border: 0;
  font-size: 14px;
  padding-left: 10px;
}

.flexrow textarea{
  flex:1;
  text-align: right;
  border: 0;
  font-size: 14px;
  padding-left: 10px;
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
