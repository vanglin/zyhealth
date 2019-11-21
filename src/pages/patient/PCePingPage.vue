<template lang="html">
  <main>
    <van-nav-bar
      title="测评结果"
      left-text=""
      left-arrow
      @click-left="onClickLeft"
    />

    <div class="result">
      <p class="hint">测评成绩为</p>
      <p class="fenshu">{{evaValue}}分</p>
    </div>

    <div class="content">
      <p>{{content}}</p>
      <div v-if='this.biyantype != 0'>治疗方案:</div>
      <ul v-show='this.biyantype == 1'>
        <li>1.建议检查变应原</li>
        <li>2.相应花粉致敏季节，回避致敏原</li>
        <li>3.若为尘螨致敏，请教专家，做一系列防范措施及相应脱敏治疗</li>
        <li>4.若为室内其他致敏(如猫毛，狗毛)，则不养</li>
        <li>5.使用抗组胺药，扑尔敏(I 代)，左旋西替利嗪(II 代，副作用较小)</li>
        <li>6.不建议使用激素鼻吸入剂</li>
        <li>7.中药，理疗及其他方法</li>
      </ul>
      <ul v-show='this.biyantype == 2'>
        <li>1.建议检查变应原</li>
        <li>2.相应花粉致敏季节，回避致敏原</li>
        <li>3.若为尘螨致敏，请教专家，做一系列防范措施及相应脱敏治疗</li>
        <li>4.若为室内其他致敏(如猫毛，狗毛)，则不养</li>
        <li>5.使用抗组胺药，扑尔敏(I 代)，左旋西替利嗪(II 代，副作用较小)</li>
        <li>6.使用激素鼻吸入剂，建议一年</li>
        <li>7.鼻塞严重时，短时间(5-7天)加用鼻减充血剂(短效:麻黄素、肾上腺素;长效:羟甲唑啉)，鼻塞改
善后，吸入鼻激素(糠酸莫米松，布地奈德，倍氯米松)，以防止血管反弹性扩张。</li>
        <li>8.使用长效抗过敏制剂，如白三烯受体拮抗剂(孟鲁司特片)</li>
        <li>9.6,7,8,条中，能用一种控制病情，就用一种，不能控制，再逐渐增加</li>
        <li>10.中药，理疗及其他方法</li>
      </ul>
      <ul v-show='this.biyantype == 3'>
        <li>1.建议检查变应原</li>
        <li>2.相应花粉致敏季节，回避致敏原</li>
        <li>3.若为尘螨致敏，请教专家，做一系列防范措施及相应脱敏治疗</li>
        <li>4.若为室内其他致敏(如猫毛，狗毛)，则不养</li>
        <li>5.使用抗组胺药，扑尔敏(I 代)，左旋西替利嗪(II 代，副作用较小)</li>
        <li>6.使用激素鼻吸入剂，建议一年</li>
        <li>7.主要表现为鼻塞时，先使用鼻减充血剂，鼻塞改善后，吸入鼻激素，以防止血管反弹性扩张。</li>
        <li>8.使用长效抗过敏制剂，如白三烯受体拮抗剂(孟鲁司特片)</li>
        <li>9.6,7,8,条中，个体化治疗，以刚好能控制症状为适宜，稳定 3-6 个月，可以考虑适当减少使用，但不可减
太快</li>
        <li>10.中药，理疗及其他方法</li>
      </ul>

    </div>

  </main>
</template>

<script>
import axios from 'axios';
import { Toast } from 'vant';
import moment from "moment";
export default {
  data(){
    return{
      evaType:'',
      evaValue:'',
      content:'',
      biyantype:0,
    }
  },

  methods:{
    onClickLeft() {
      this.$router.back();
    },
    getcontent(){

      if(this.evaType == 'TRACK' || this.evaType == 'C-ACT' || this.evaType == 'ACT'){
        if(parseInt(this.evaValue) <= 5){
          this.content = '祝贺您！在过去4周内，你的哮喘已得到完全控制。';
        }
        else if(parseInt(this.evaValue) > 10){
          this.content = '未达到目标在过去4周内，您的哮喘可能没有得到控制。您的医生可以帮您制订一个哮喘管理计划，帮助您改善哮喘控制。';
        }else{
          this.content = '接近目标在过去4周内，您的哮喘已得到良好控制，但还没有完全控制。您的医生也许可以帮助您得到完全控制。';
        }
      }
      //鼻炎
      else if(this.evaType == 'SAR'){


        let value = parseInt(this.evaValue);
        if(value <= 0){
          this.content = '您无过敏性鼻炎';
          this.biyantype = 0;
        }
        else if(value > 0 && value < 5) {
          this.content = '您有轻微鼻炎症状';
          this.biyantype = 1;
        }
        else if(value > 4 && value < 9){
          this.content = '您有中度鼻炎症状';
          this.biyantype = 2;
        }else{
          this.content = '您有重度鼻炎症状';
          this.biyantype = 3;
        }
      }


    },
    getdata(){
      let userid = localStorage.getItem('userid');
      var params = {
        uid:userid,
        evaValue:this.evaValue,
        evaType:this.evaType,
        deviceId:-1,
        evaTime:moment().format('YYYY-MM-DD HH:mm:ss')
      }
      axios.post('/API/api/service/evaRec/add',params)
      .then(response => {
        this.getcontent();
      })
      .catch(error => {
        Toast('评分数据');
      });
    }
  },
  mounted(){
    this.evaType = this.$route.query.evaType;
    this.evaValue = this.$route.query.evaValue;
    if(this.evaType == 'SAR'){
      this.evaValue -= 22;
    }
    this.getdata();
  }
}
</script>

<style lang="css" scoped>

.result{
  background-color: #37BEA9;
  height: 200px;
}

.result .hint{
  color: #fff;
  padding: 0;
  margin: 0;
  text-align: center;
  font-size: 14px;
  padding-top: 60px;
}
.result .fenshu{
  color: #fff;
  padding: 0;
  margin: 0;
  text-align: center;
  font-size: 30px;
}

.content{
  padding: 10px;
}
.content p{
  font-size: 16px;
}

li{
  margin: 6px 0;
}

</style>
