<template lang="html">
  <main>
    <van-nav-bar
      title="用药详情"
      left-text=""
      left-arrow
      @click-left="onClickLeft"
    />

    <van-cell-group>


      <div class="flexrow" @click='changedrug()'>
        <label for="drug">名称</label>
        <p>{{this.drug}}</p>
      </div>

      <div class="flexrow" @click='changedrug()'>
        <label for="altercol">类型</label>
        <p>{{this.altercol}}</p>
      </div>

      <div class="flexrow" @click='changedrug()'>
        <label for="functionDescript">描述</label>
        <p>{{this.functionDescript}}</p>
      </div>

      <div class="flexrow" @click='changedrug()'>
        <label for="treatSymptoms">症状</label>
        <p>{{this.treatSymptoms}}</p>
      </div>

      <div class="flexrow" @click='changedrug()'>
        <label for="advEffect">规格</label>
        <p>{{this.advEffect}}</p>
      </div>

      <div class="flexrow" @click='changedrug()'>
        <label for="dosageManage">用量用法</label>
        <p>{{this.dosageManage}}</p>
      </div>

      <div class="flexrow">
        <label for="dosageManage">实际服用次数</label>
        <input type="text" name="drugNum" value="drugNum" v-model="drugNum">
      </div>

      <div class="flexrow" @click='changestarttime()'>
        <label for="startUseTime">开始时间</label>
        <p>{{this.startUseTime}}</p>
      </div>

      <div class="flexrow" @click='changeendtime()'>
        <label for="endUseTime">结束时间</label>
        <p>{{this.endUseTime}}</p>
      </div>


    </van-cell-group>

    <div class="btn" v-if='isedit == false'>
      <van-button bottom-action class="addbtn" @click='adddrug()'>新增</van-button>
    </div>

    <div class="btn" v-else>
      <van-button bottom-action class="editbtn" @click='editdrug()'>修改</van-button>
      <van-button bottom-action class="delbtn" @click='deldrug()'>删除</van-button>
    </div>



    <van-actionsheet v-model="show">
      <!-- <p>一些内容</p> -->
      <van-datetime-picker
        v-model="currentDate"
        type="datetime"
        @confirm='confirm'
        @cancel='cancel'
      />
    </van-actionsheet>








  </main>
</template>

<script>
import axios from 'axios';
import { Toast ,DatetimePicker,Actionsheet,Dialog} from 'vant';
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
      id:'',
      drugNum:'',
      endUseTime:'',
      startUseTime:'',
      recordTime:'',
      // supplier:''
      isedit:false,
      currentDate:new Date(),
      curindex:0,
      show:false

    }
  },
  methods:{
    changestarttime(){
      this.show = true
      this.curindex = 1;
    },
    changeendtime(){
      this.show = true;
      this.curindex = 2;
    },
    confirm(value){
      this.show = false;
      if(this.curindex == 1){
        this.startUseTime = moment(value).format('YYYY-MM-DD HH:mm:ss');
      }else{
        this.endUseTime = moment(value).format('YYYY-MM-DD HH:mm:ss');
      }
    },
    cancel(){
      this.show =false;
    },
    changedrug(){
      this.$router.push({path:'/pdrugadd'});
    },

    onClickLeft() {
      this.$router.push({path:'/pdrug'});
    },

    adddrug(){
      if (this.drugid == '' || this.drugNum == '' || this.functionDescript == '' || this.treatSymptoms == '' || this.advEffect == '' || this.dosageManage == '') {
        Toast('请完善数据');
        return;
      }
      let params = {
        "drugId":this.drugid,
        "drugNum": parseInt(this.drugNum),
        "recordTime": moment().format('YYYY-MM-DD HH:mm:ss'),
        "endUseTime": this.endUseTime,
        "startUseTime": this.startUseTime,
        "uid":localStorage.getItem('userid')
      }

      console.log(params);

      axios.post('/API/api/service/uDrugRec/add',params)
      .then(response => {
        Toast('添加成功');
        this.$router.push({path:'/pdrug'});
      })
      .catch(error => {
        Toast('添加失败');
      });


    },
    editdrug(){
      if (this.drugid == '' || this.drugNum == '' || this.functionDescript == '' || this.treatSymptoms == '' || this.advEffect == '' || this.dosageManage == '') {
        Toast('请完善数据');
        return;
      }
      let params = {
        "drugId":this.drugid,
        "drugNum": parseInt(this.drugNum),
        "id":this.id,
        "recordTime": moment().format('YYYY-MM-DD HH:mm:ss'),
        "endUseTime": this.endUseTime,
        "startUseTime": this.startUseTime,
      }
      axios.post('/API/api/service/uDrugRec/update',params)
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
        let api = '/API/api/service/uDrugRec/delete/' + this.id;
        axios.get(api)
        .then(response => {
          Toast('删除成功');
          this.$router.push({path:'/pdrug'});
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
    let drug = localStorage.getItem('pdrug');
    if (drug != null) {
      let item = JSON.parse(drug);
      this.drugid = item.drugId;
      this.drug = item.drug;
      this.altercol = item.drugAltercol;
      this.functionDescript = item.functionDescript;
      this.treatSymptoms = item.treatSymptoms;
      this.advEffect = item.advEffect;
      this.dosageManage = item.dosageManage;
      this.id = item.id;
      this.drugNum = item.drugNum;
      this.endUseTime = item.endUseTime;
      this.recordTime = item.recordTime;
      this.startUseTime = item.startUseTime;
      this.isedit = item.isedit;
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
