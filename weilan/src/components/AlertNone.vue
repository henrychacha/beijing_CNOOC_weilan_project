<template>
  <div class="alert" :style="{backgroundColor:`${taggleAlert == 0?'#fff':''}`}">
    <p v-if="taggleAlert == 0"  class="more">没有更多了~~~</p>
    <p v-if="taggleAlert == 1" class="search">没有相关搜索结果~~</p>
  </div>
</template>

<script>
export default {
  props: ["taggleAlert"],
};
</script>

<style lang="scss" scoped>
.alert {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 1rem;
  font-size: 0.2rem;
  font-weight: normal;
  font-stretch: normal;
  line-height: 0.36rem;
  letter-spacing: 0rem;
  color: #999999;
  p {
    text-align: center;
  }
}
</style>