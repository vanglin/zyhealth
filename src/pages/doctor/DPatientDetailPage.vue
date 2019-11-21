<template lang="html">
  <main>
    <van-nav-bar
      title="我的用户"
      left-text=""
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="flexrow flexborder" @click='tomessagepage()'>
      <img src="../../assets/images/xingxi.png" alt="">
      <p>基本信息</p>
      <img src="../../assets/images/message.png" alt="">
    </div>
    <div class="basicinfo">
      <p>姓名: <span v-if="res.user">{{res.user.name}}</span> </p>
      <p>年龄: <span v-if="res.patientuser">{{res.patientuser.age}}岁</span> </p>
      <p>身份证: <span v-if="res.patientuser">{{res.patientuser.cardNo}}</span> </p>
      <p>地址: <span v-if="res.patientuser">{{res.patientuser.permAddr}}</span> </p>
      <p>手机号: <span v-if="res.patientuser">{{res.patientuser.mobile}}</span> </p>
    </div>

    <section>
      <div class="flexrow">
        <img src="../../assets/images/shuju.png" alt="">
        <p>数据信息</p>
      </div>
      <van-tabs @click="handleTabClick">
        <van-tab  :title="'日'">
        </van-tab>
        <van-tab :title="'周'">
        </van-tab>
        <van-tab :title="'月'">
        </van-tab>
        <van-tab :title="'季'">
        </van-tab>
        <van-tab :title="'年'">
        </van-tab>
      </van-tabs>
      <div class="downtime" @click="showpicker()" v-show='curindex == 0'>
        <span>{{curDataStr}}</span>
        <img src="../../assets/images/down.png" alt="">
      </div>

      <div class="downtime" @click="showpickerday()" v-show='curindex != 0'>
        <span>{{downtext}}</span>
        <img src="../../assets/images/down.png" alt="">
      </div>

    </section>


    <section v-show='curindex == 0'>
      <section class="shangwu">
        <h3>上午</h3>
        <div class="rate">
          <van-circle class="circle"
            v-model="currentRate"
            color="#37BEA9"
            :rate="100"
            :speed="100"
            :text="shangwuevaobj == '' ? '0' : shangwuevaobj.PEFBest.toString()"
            fill="#fff"
            size="120px"
            layer-color="#eee"
            :stroke-width="60"
          />
          <p class="top">PEF</p>
          <p class="down">L/min</p>
        </div>
        <p>PEF日变异率：{{shangwuevaobj == '' ? 0 : shangwuevaobj.PEF}}%</p>
        <p>FVC：{{shangwuevaobj == '' ? 0 : shangwuevaobj.FVC}}L</p>
        <p>FEV1：{{shangwuevaobj == '' ? 0 : shangwuevaobj.FEV1}}</p>
        <p>FEV1/FVC：{{shangwuevaobj == '' ? 0 : (parseFloat(shangwuevaobj.FEV1)  * 1.0 / parseFloat(shangwuevaobj.FVC) * 100).toFixed(2)}}%</p>
        <p>个人最佳值：{{shangwuevaobj == '' ? 0 : shangwuevaobj.PEFBest}}L/min ;个人预计值：{{shangwuevaobj == '' ? 0 : shangwuevaobj.PEFPredict}}L/min</p>
        <p>症状描述:{{shangwures == '' ? '': shangwures.symDescription}}</p>
        <p>用药记录:{{shangwures == '' ? '': shangwures.medRecord}}</p>
      </section>

      <section class="shangwu">
        <h3>下午</h3>
        <div class="rate">
          <van-circle class="circle"
            v-model="currentRate"
            color="#37BEA9"
            :rate="100"
            :speed="100"
            :text="xiawuevaobj == '' ? '0' : xiawuevaobj.PEFBest.toString()"
            fill="#fff"
            size="120px"
            layer-color="#eee"
            :stroke-width="60"
          />
          <p class="top">PEF</p>
          <p class="down">L/min</p>
        </div>
        <p>PEF日变异率：{{xiawuevaobj == '' ? 0 : xiawuevaobj.PEF}}%</p>
        <p>FVC：{{xiawuevaobj == '' ? 0 : xiawuevaobj.FVC}}L</p>
        <p>FEV1：{{xiawuevaobj == '' ? 0 : xiawuevaobj.FEV1}}</p>
        <p>FEV1/FVC：{{xiawuevaobj == '' ? 0 : (parseFloat(xiawuevaobj.FEV1)  * 1.0 / parseFloat(xiawuevaobj.FVC) * 100).toFixed(2)}}%</p>
        <p>个人最佳值：{{xiawuevaobj == '' ? 0 : xiawuevaobj.PEFBest}}L/min ;个人预计值：{{xiawuevaobj == '' ? 0 : xiawuevaobj.PEFBest}}L/min</p>
        <p>症状描述:{{xiawures == '' ? '': xiawures.symDescription}}</p>
        <p>用药记录:{{xiawures == '' ? '': xiawures.medRecord}}</p>
      </section>
    </section>


    <section v-show='curindex != 0'>
      <div class="row">
        <button type="button" class="van-button van-button--default van-button--mini" v-bind:class="{ activebtn: selectchart == '1' }" @click="changeChart('1')">PEF</button>
        <button type="button" class="van-button van-button--default van-button--mini" v-bind:class="{ activebtn: selectchart == '2' }" @click="changeChart('2')">FEV1</button>
        <button type="button" class="van-button van-button--default van-button--mini" v-bind:class="{ activebtn: selectchart == '3' }" @click="changeChart('3')">FVC</button>
        <div id="chart1" :style="{width: width + 'px', height: '300px'}"></div>
      </div>
      <div class="row">
        <div class="flexrow">
          <p class="hintp">PEF变异率</p>
          <p class="hintp2"><span><13%</span>{{PEFlow}}次</p>
          <p class="hintp2"><span>≥13%</span>{{PEFhigh}}次</p>
        </div>
        <div id="chart2" :style="{width: width + 'px', height: '300px'}"></div>
      </div>
      <div class="row">
        <p class="hint">症状描述</p>
        <span>{{symDescription}}</span>
        <p class="hint2">用药记录</p>
        <span>{{medRecord}}</span>
      </div>
    </section>


    <section>
      <van-actionsheet v-model="show">
        <van-datetime-picker
          v-model="currentDate"
          type="date"
          @cancel="onCancel"
          @confirm="onConfirm"
          @change="onChange"
        />
      </van-actionsheet>
    </section>

  </main>

</template>

<script>
import axios from 'axios';
import { Toast } from 'vant';
import moment from "moment";
export default {
  data(){
    return{
      curindex:0,
      currentRate: 0,
      megOwner:'',
      res:'',
      healthres:'',
      shangwures:'',
      xiawures:'',
      shangwuevaobj:'',
      xiawuevaobj:'',
      currentDate: new Date(),
      show: false,
      curDataStr:moment().format('YYYY-MM-DD'),

      downtext:'',
      columns:[],
      width:document.documentElement.clientWidth,
      startTime:'',
      endTime:'',
      statres:'',
      res:'',
      selectchart:'1',
      PEFlow:0,
      PEFhigh:0,
      symDescription:'',
      medRecord:'',

      weeklabel:[],
      monthlabel:[],
      quarterlabel:[],
      yearlabel:[],

      pefbestdata:[],
      pev1data:[],
      pvcdata:[],
      pefdata:[]




    }
  },
  methods:{
    onClickLeft() {
      this.$router.back();
    },
    tomessagepage(){
      this.$router.push({path:'/danswer',query: { megOwner: this.megOwner}});
    },
    getdaydata(){
      let api = 'API/api/service/user/view/' + this.megOwner;
      axios.get(api)
      .then(response => {
        this.res = response.data;
      })
      .catch(error => {
        Toast('获取数据失败');
      });
    },
    gethealthdata(){
      var params = {
        uid:this.megOwner,
        evaType: "PEF",
        startTime:this.curDataStr + " 00:00:00",
        endTime:this.curDataStr + " 24:00:00"
      }
      axios.post('/API/api/service/evaRec/getList',params)
      .then(response => {
        this.healthres = response.data;

        this.shangwures = '';
        this.xiawures = '';
        this.shangwuevaobj = '';
        this.xiawuevaobj = '';

        if (this.healthres.length > 0) {
          if (this.healthres.length == 1) {
            let item = this.healthres[0];
            if (item.evaTime > (this.curDataStr + " 12:00:00")) {
              this.xiawures = item;
              this.xiawuevaobj = eval('(' + this.xiawures.evaValue + ')');
            }else{
              this.shangwures = item;
              this.shangwuevaobj = eval('(' + this.shangwures.evaValue + ')');
            }
          }else{
            this.shangwures = this.healthres[0];
            this.xiawures = this.healthres[1];
            this.shangwuevaobj = eval('(' + this.shangwures.evaValue + ')');
            this.xiawuevaobj = eval('(' + this.xiawures.evaValue + ')');
          }
        }
      })
      .catch(error => {
        Toast('获取数据失败');
      });
    },

    handleTabClick(index) {
      this.curindex = index;
      this.selectchart = '1';
      if (this.curindex == 1) {
        this.downtext = '第' + moment().week() + '周';
        this.columns = [];
        for (var i = 1; i <= moment().week(); i++){
          this.columns.push('第' + i + '周');
        }
        this.getrangetime(moment().week());
      }
      else if(this.curindex == 2){
        this.downtext = '第' + (moment().month()+1) + '月';
        this.columns = [];
        for (var i = 1; i <= (moment().month()+1); i++) {
          this.columns.push('第' + i + '月');
        }
        this.getrangetime(moment().month()+1);
      }
      else if(this.curindex == 3){
        this.downtext = '第' + moment().quarter() + '季度';
        this.columns = [];
        for (var i = 1; i <= moment().quarter(); i++) {
          this.columns.push('第' + i + '季度');
        }
        this.getrangetime(moment().quarter());
      }
      else if(this.curindex == 4){
        this.downtext = moment().year();
        this.columns = [moment().year()];
        this.getrangetime(moment().year());
      }
    },
    getrangetime(value){
      //周
      if (this.curindex == 1) {
        var weekOfday = moment().day();//计算今天是这周第几天
        var curweek = moment().week();
        var weekrang = curweek - value;
        var last_sunday = moment().add(7 - weekOfday - 7 * weekrang, 'days').format('YYYY-MM-DD');
        var last_monday = moment().subtract(weekOfday - 1 + 7 * weekrang, 'days').format('YYYY-MM-DD');
        this.startTime = last_monday + ' 00:00:00';
        this.endTime = last_sunday + ' 24:00:00';
      }
      //月
      else if(this.curindex == 2){
        if (value < 10) {
          var str = moment().year() + '-0' + value + '-01';
          var days = moment(str).daysInMonth();
          this.startTime = moment().year() + '-0' + value + '-01 00:00:00';
          this.endTime = moment().year() + '-0' + value + '-' + (days) + ' 24:00:00';
        }else{
          var str = moment().year() + '-' + value + '-01';
          var days = moment(str).daysInMonth();
          this.startTime = moment().year() + '-' + value + '-01 00:00:00';
          this.endTime = moment().year() + '-' + value + '-' + (days) + ' 24:00:00';
        }
      }
      //季
      else if(this.curindex == 3){
        switch (value) {
          case 1:
            this.startTime = moment().year() + '-01-01 00:00:00';
            this.endTime = moment().year() + '-03-31 24:00:00';
            break;
          case 2:
            this.startTime = moment().year() + '-04-01 00:00:00';
            this.endTime = moment().year() + '-06-30 24:00:00';
            break;
          case 3:
            this.startTime = moment().year() + '-07-01 00:00:00';
            this.endTime = moment().year() + '-09-30 24:00:00';
            break;
          case 4:
            this.startTime = moment().year() + '-10-01 00:00:00';
            this.endTime = moment().year() + '-12-31 24:00:00';
            break;
          default:
            break;
        }
      }
      //年
      if (this.curindex == 4) {
        this.startTime = moment().year() + '-01-01 00:00:00';
        this.endTime = moment().year() + '-12-31 24:00:00';
      }
      // this.initChart();
      this.getstatdata();
    },
    changeChart(value){
      this.selectchart = value;
      var option;
      var xdata;
      if (this.curindex == 1) {
        xdata = this.weeklabel;
      }
      else if(this.curindex == 2){
        xdata = this.monthlabel;
      }
      else if(this.curindex == 3){
        xdata = this.quarterlabel;
      }
      else if(this.curindex == 4){
        xdata = this.yearlabel;
      }
      switch (this.selectchart) {
        case '1':
          option = {
            xAxis: {
                type: 'category',
                axisTick: {
                   alignWithLabel: true
                },
                axisLabel: {
                 interval:0,
                 rotate:40
                },
                data: xdata
            },
            grid: {
             x: 50,
            },
            yAxis: {
              type: 'value',
              axisLabel: {
                 formatter: '{value} L'
              },
            },
            series: [{
                type: 'line',
                smooth: true,
                data: this.pefbestdata
            }]
          }
          break;
        case '2':
          option = {
            xAxis: {
                type: 'category',
                axisTick: {
                   alignWithLabel: true
                },
                axisLabel: {
                 interval:0,
                 rotate:40
                },
                data: xdata
            },
            grid: {
             x: 50,
            },
            yAxis: {
              type: 'value',
              axisLabel: {
                 formatter: '{value} L'
              },
            },
            series: [{
                type: 'line',
                smooth: true,
                data: this.pev1data
            }]
          }
          break;
        case '3':
          option = {
            xAxis: {
                type: 'category',
                axisTick: {
                   alignWithLabel: true
                },
                axisLabel: {
                 interval:0,
                 rotate:40
                },
                data: xdata,
            },
            grid: {
             x: 50,
            },
            yAxis: {
              type: 'value',
              axisLabel: {
                 formatter: '{value} L'
              },
            },
            series: [{
                type: 'line',
                smooth: true,
                data: this.pvcdata
            }]
          }
          break;
        default:
          break;
      }
      this.drawChart(option);

    },
    initxlabel(){
      this.weeklabel = ['周一','周二','周三','周四','周五','周六','周日'];
      this.monthlabel = ['1','3','5','7','9','11','13','15','17','19','21','23','25','27','29','31'];
      this.quarterlabel = [' 1周','2周','3周','4周','5周','6周','7周','8周','9周','10周','11周','12周','13周'];
      this.yearlabel = ['1周','5周','9周','13周','17周','21周','25周','29周','33周','37周','41周','45周','49周'];
    },


    initydata(count){
      let res = this.res.reverse();
      this.pefbestdata = [];
      this.pev1data = [];
      this.pvcdata = [];
      this.pefdata = [];
      for (var i = 0; i < count; i++) {
        this.pefbestdata.push(0);
        this.pev1data.push(0);
        this.pvcdata.push(0);
        this.pefdata.push(0);
      }

      var dayrange = 0;
      switch (this.curindex) {
        case 1:
          dayrange = 1
          break;
        case 2:
          dayrange = 2;
          break;
        case 3:
          dayrange = 7;
          break;
        case 4:
          dayrange = 28;
          break;
        default:
          break;
      }

      var curindex = 0;
      var resindex = 0;
      var rescount = 0;
      var startday = this.startTime.substring(0,10);
      startday = moment(startday, "YYYY-MM-DD").add(dayrange - 1, 'days').format('YYYY-MM-DD');
      var endday = this.endTime.substring(0,10);

      while (curindex < count && resindex < res.length) {
        let item = res[resindex];
        if (startday < item.evaTime.substring(0,10)) {
          if (rescount != 0) {

            this.pefbestdata[curindex] /= rescount;
            this.pev1data[curindex] /= rescount;
            this.pvcdata[curindex] /= rescount;
            this.pefdata[curindex] /= rescount;
          }

          curindex += 1;
          startday = moment(startday, "YYYY-MM-DD").add(dayrange, 'days').format('YYYY-MM-DD');
          rescount = 0;
        }
        if(startday >= item.evaTime.substring(0,10)){
          rescount += 1;
          var obj = eval('(' + item.evaValue + ')');
          this.pefbestdata[curindex] += parseInt(obj.PEFBest);
          this.pev1data[curindex] += parseInt(obj.FEV1);
          this.pvcdata[curindex] += parseInt(obj.FVC);
          this.pefdata[curindex] += parseInt(obj.PEF);
          resindex += 1;
        }
        if (resindex == res.length) {
          if (rescount != 0) {
            this.pefbestdata[curindex] /= rescount;
            this.pev1data[curindex] /= rescount;
            this.pvcdata[curindex] /= rescount;
            this.pefdata[curindex] /= rescount;
          }
        }

      }

      var option1;
      var option2;
      var xdata;
      if (this.curindex == 1) {
        xdata = this.weeklabel;
      }
      else if(this.curindex == 2){
        xdata = this.monthlabel;
      }
      else if(this.curindex == 3){
        xdata = this.quarterlabel;
      }
      else if(this.curindex == 4){
        xdata = this.yearlabel;
      }
      option1 = {
        xAxis: {
            type: 'category',
            axisTick: {
                alignWithLabel: true
            },
            axisLabel: {
             interval:0,
             rotate:40
            },
            data: xdata
        },
        grid: {
          x: 50,
        },
        yAxis: {
          type: 'value',
          axisLabel: {
             formatter: '{value}L'
          },
        },
        series: [{
            type: 'line',
            smooth: true,
            data: this.pefbestdata
        }]
      }
      option2 = {
        xAxis: {
             type: 'category',
             axisTick: {
                alignWithLabel: true
             },
             axisLabel: {
              interval:0,
              rotate:40
             },
             data: xdata
         },
         grid: {
          x: 50,
         },
         yAxis: {
             type: 'value',
             axisLabel: {
                formatter: '{value}%'
             },
         },
         series: [{
             data: this.pefdata,
             type: 'line',
             smooth: true
         }]
      }
      this.drawChart(option1);
      this.drawChart2(option2);
    },
    initdata(){
      //周
      if (this.curindex == 1) {
        this.initydata(this.weeklabel.length);
      }
      //月
      else if(this.curindex == 2){
        this.initydata(this.monthlabel.length);
      }
      //季
      else if(this.curindex == 3){
        this.initydata(this.quarterlabel.length);
      }
      //年
      else if(this.curindex == 4){
        this.initydata(this.yearlabel.length);
      }
    },
    drawChart(option){
        let myChart = this.$echarts.init(document.getElementById('chart1'));
        myChart.setOption(option);
    },
    drawChart2(option){
        let myChart = this.$echarts.init(document.getElementById('chart2'));
        myChart.setOption(option);
    },
    showpicker(){
      if (this.curindex != 4) {
        this.show = true;
      }
    },
    onCancel(){
      this.show = false;
    },
    onConfirm(value, index){
      this.show = false;
      this.downtext = value;
      this.selectchart = '1';
      this.getrangetime(index+1);
    },

    getstatdata(){
      let userid = this.megOwner;
      var params = {
        uid:userid,
        startTime:this.startTime,
        endTime:this.endTime
      }
      axios.post('/API/api/service/evaRec/statSymp',params)
      .then(response => {

        this.statres = response.data;
        for(const key in this.statres.PEF){
          if (key == 'high') {
            this.PEFhigh = this.statres.PEF[key];
          }else if(key == 'low'){
            this.PEFlow = this.statres.PEF[key];
          }
        }
        this.symDescription = '';
        for(const key in this.statres.symDescription){
          let str = key + ':' + this.statres.symDescription[key] + '次';
          this.symDescription += str + ' ';
        }
        this.medRecord = '';
        for(const key in this.statres.medRecord){
          let str = key + ':' + this.statres.medRecord[key] + '次';
          this.medRecord += str + ' ';
        }
        this.getdata();
      })
      .catch(error => {
        Toast('获取数据失败');
      });
    },
    getdata(){

      let userid = this.megOwner;
      var params = {
        uid:userid,
        evaType:'PEF',
        startTime:this.startTime,
        endTime:this.endTime
      }
      axios.post('/API/api/service/evaRec/getList',params)
      .then(response => {
        this.res = response.data;
        this.initdata();
      })
      .catch(error => {
        console.log(error);
        Toast('获取数据失败');
      });
    },

    //picker
    showpicker(){
      this.show = true;
    },
    onCancel(){
      this.show = false;
    },
    onConfirm(){
      this.show = false;
      this.gethealthdata();
    },
    onChange(picker){
      var str = '';
      for (var i = 0; i < picker.getValues().length; i++) {
        let item = picker.getValues()[i];
        str += item;
        if (i != picker.getValues().length - 1) {
          str += '-'
        }
      }
      this.curDataStr = str;
    }

  },
  mounted(){
    this.megOwner = this.$route.query.megOwner;
    this.getdaydata();
    this.gethealthdata();


    this.initxlabel();

  }
}
</script>

<style lang="css" scoped>

main{
  background-color: #f5f5f5;
  min-height: 100vh;
}
section{
  margin-top: 10px;
}
.flexrow{
  background-color: #ffffff;
  display: flex;
  padding: 0 10px;
  align-items: center;

  /* justify-content: center; */
}

.flexborder{
  border-bottom: 1px solid #e5e5e5;
}

.flexrow img{
  width: 20px;
  height: 20px;
}
.flexrow img:last-child{
  position: absolute;
  right:8px;
}
.flexrow p{
  margin-left: 8px;
  font-size: 14px;
}
.basicinfo{
  padding:10px;
  background-color: #fff;
}
.basicinfo p{
  font-size: 14px;
  margin: 6px;
}
.basicinfo span{
  color: #7F7F7F;
}

.downtime{
  text-align: center;
  background-color: #fff;
  padding: 10px;
}
.downtime img{
  width: 20px;
  height: 12px;
  display: inline-block;
  padding-left: 4px;
  vertical-align: middle;
}

.shangwu{
  background-color: #fff;
  padding: 10px;
}
.shangwu p{
  font-size: 14px;
  margin: 6px;
  /* position: relative; */
}
.shangwu .rate{
  text-align: center;
  position: relative;
}
.shangwu .rate .circle{
  /* position: relative; */
}
.shangwu .top{
  position: absolute;
  top: 15px;
  left:44%;
  font-size: 16px;
}
.shangwu .down{
  position: absolute;
  top: 75px;
  left:44%;
  font-size: 12px;
}

.row{
  background-color: #fff;
  padding:10px;
  margin: 10px 0;
}

.row .hint{
  font-size: 16px;
  margin: 0 0 6px 0;
}

.row .hint2{
  font-size: 16px;
  margin: 20px 0 6px 0;
}

.row img{
  width: 10px;
  height: 10px;
}

.row span{
  font-size: 12px;
}

.flexrow{
  display: flex;
}
.flexrow .hintp{
  flex:1;
  margin:0;
}
.flexrow .hintp2{
  margin-top: 0;
  font-size: 14px;
  margin-right: 10px;
}
.flexrow .hintp2 span{
  font-size: 14px;
  color: #37BEA9;
  padding-right: 6px;
}


.activebtn{
  background-color: #37BEA9;
  color:#fff;
}


</style>
