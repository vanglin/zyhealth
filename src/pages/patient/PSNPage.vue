<template lang="html">
  <main>
    <van-nav-bar
      title="输入SN码"
      left-text=""
      left-arrow
      @click-left="onClickLeft"
    />
    <section>
      <p>输入设备背面的11位SN编码</p>
      <van-cell-group>
        <van-field
          v-model="sn"
          label="SN码"
          placeholder="请输入SN码"
          required
        />
      </van-cell-group>

      <div class="btn">
        <van-button bottom-action class="addbtn">绑定</van-button>
      </div>

    </section>

  </main>
</template>

<script>
export default {
  data(){
    return{
      sn:''
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

section p{
  text-align: center;
  font-size: 12px;
  color: #37BEA9;
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
