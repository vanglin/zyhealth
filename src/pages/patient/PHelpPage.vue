<template lang="html">
  <main>
    <van-nav-bar
      title="帮助"
      left-text=""
      left-arrow
      @click-left="onClickLeft"
    />

    <div class="row">
      <h3>PEF介绍</h3>
      <h4>* 什么是PEF?</h4>
      <p>PEF：呼气峰流速(Peak Expiratory Flow,PEF) 是指用力呼气的最高流量，
        能够反应气道的通 畅性。是肺功能评估的关键指标。
      </p>
      <p>PEF日变异率=（最大值-最小值）/(（最大值+最小值）/2)X100%，连续监测2周≥13%，
        是诊断哮喘的主要指标之一。
      </p>
    </div>

    <div class="row">
      <h4>* PEF对哮喘治疗有什么意义？</h4>
      <p>PEF的测定意义类似与高血压病人日常测定血 压，主要用于辅助哮喘诊断，评估哮喘病情和 指导用药。
        持续检测PEF有助于及时发现哮急性发作风险。在治疗开始时、治疗开始后3至6个月（明确患者PEF个人最佳值）
        及后期治疗随访中定期进行，以评估哮喘未来风险。</p>
    </div>

    <div class="row">
      <h4>* 日常如何监测PEF？</h4>
      <p>日常PEF的监测应该是每天测两次，分别是早晨起床后以及晚上睡觉前。每次测3遍，记录其最佳值，绘制成曲线（本肺功能仪会自动绘制成曲线并上传至云端，更加直观）。
        证据显示，日常自我PEF监测可以显著降低哮喘患者的发病率。包括减少至少三分之一的哮喘住院率、急性发作、非预约门诊、无法工作或上学、夜间急性发作等。</p>
    </div>

    <div class="row">
      <h4>* 个人PEF最佳值：</h4>
      <p>指在自觉无症状，且病情稳定至少2周的情况下，每天早晨起床后和晚上睡觉前连续监测的PEF最高数值。
        个人PEF最佳值往往经过一段时间的治疗后，在病情稳定的情况下，会有向上浮动，表明治疗哮喘呈好转趋势。</p>
    </div>

    <div class="row">
      <h4>* PEF绿黄红信号灯管理法</h4>
      <p>实际测得PEF值高于个人PEF最佳值80%说明病情控制正常，应该积极预防；</p>
      <p>实际测得PEF值在个人最佳值60% ~ 80%区间说明控制异常，有哮喘发作征兆，应维持药物的使用；</p>
      <p>实际测得PEF值低于个人OEF最佳值60%说明病情控制危险，应当立即服务应急药物，并尽快就医。</p>
    </div>


  </main>
</template>

<script>
export default {
  data(){
    return{
    }
  },
  methods:{
    onClickLeft() {
      this.$router.back();
    }
  }
}
</script>

<style lang="css" scoped>

main{
  background-color: #f5f5f5;
  min-height: 100vh;
}

h3{
  text-align: center;
}

.row{
  background-color: #fff;
  padding: 10px;
  margin-bottom: 10px;
}
.row h4{
  color: #37BEA9;
  margin: 6px 0;
  padding: 0;
}
.row p {
  margin: 6px;
}

</style>
