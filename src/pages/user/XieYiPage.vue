<template lang="html">
  <main>
    <van-nav-bar
      title="用户协议"
      left-text=""
      left-arrow
      @click-left="onClickLeft"
    />

    <section>
      <h4>使用本微信公众号平台的用户需遵守如下原则：</h4>
      <ol>
        <li>1.遵守国家相关法律法规，不从事违法或违反《微信公众平台服务协议》及相关规则的内容和行为；</li>
        <li>2.阅读过并同意遵守《微信公众平台微信互联设备功能服务协议》；</li>
        <li>3.使用真实身份证号码和手机号码，进行注册；</li>
        <li>4.保护本平台的自用，不提供给第三方关于本平台的相关信息；</li>
        <li>5.不恶意进攻本平台，不利用本平台从事中国国家法律不容许的任何活动；</li>
        <li>6.不发送垃圾信息并不存在过度营销行为，鼓励向用户传送符合需求的真实资讯；</li>
        <li>7.尊重平台相关产品的知识产权和版权，不从事仿冒制作；</li>
      </ol>

    </section>

  </main>
</template>

<script>
export default {

  methods:{
    onClickLeft(){
      this.$router.back();
    }
  }

}
</script>

<style lang="css" scoped>

section{
  padding: 0 10px;
}

li{
  line-height: 200%;
}
</style>
