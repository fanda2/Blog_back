<template>
  <div>
    <span>{{message}}</span>
  </div>
</template>
<script>
export default {
  data () {
    return {
      message: '欢迎登陆校园疫情防控服务系统服务管理平台'
    }
  }
}
</script>
<style lang="less" scoped>
div {
  margin: 0 auto;
  text-align: center;
}
span {
  font-size: 50px;
  font-weight: bold;
  color: #13afed;
  text-shadow: skyblue 2px 2px 3px;
}
</style>
