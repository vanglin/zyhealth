<template lang="html">
  <main>
    <van-nav-bar
      title="详情"
      left-text=""
      left-arrow
      @click-left="onClickLeft"
    />

    <div class="content">
      <h3>{{title}}</h3>
      <p>{{editor}} <span>{{time}}</span> </p>
      <p v-html="content"></p>

    </div>

  </main>
</template>

<script>
export default {
  data(){
    return{
      editor:'',
      time:'',
      title:'',
      content:''
    }
  },
  methods:{
    onClickLeft() {
      // Toast('返回');
      this.$router.back();
    },
  },
  mounted(){
    let res = JSON.parse(localStorage.getItem('article'));
    this.editor = res.editor;
    this.time = res.createTime;
    this.title = res.title;
    this.content = res.content;
  }
}
</script>

<style lang="css" scoped>

.content{
  padding:0 10px;
}

img{
  width: 100%;
}

</style>
