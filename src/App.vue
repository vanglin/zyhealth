<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>


<style lang="css">
  @import "./assets/css/base.css";

.van-card__thumb{
  height: 60px;
  align-items: flex-start;
  top:10px;
}


.van-card{
  height: 80px;
  padding-top: 10px;
}

.van-card__thumb img{
  width: 100%;
  height: 90px;
}

</style>
