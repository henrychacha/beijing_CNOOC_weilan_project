<template>
  <div class="buttonGroup">
    <div v-show="deleteHistoryTaggle" class="historyBar">
      <p>历史搜索</p>
      <img
        @click="handleDeleteHistory()"
        src="../assets/image/images/weilan-trash-icon.gif"
        alt=""
      />
    </div>
    <div class="buttonPanel">
      <el-button
        class="buttonItem"
        v-for="(item, index) in searchHistoryList"
        :key="index"
        size="mini"
        round
        @click="handleButton(item)"
        >{{ item }}</el-button
      >
    </div>
  </div>
</template>

<script>
export default {
  props: ["searchHistoryList", "handleSearchBar", "deleteHistoryTaggle"],
  data() {
    return {};
  },
  methods: {
    handleButton(item) {
      this.$emit("handleSearchBar", item);
    },
    handleDeleteHistory() {
      this.$emit("handleDeleteHistory");
    },
  },
};
</script>

<style lang="scss" scoped>
.buttonGroup {
  margin: 0.39rem 0.4rem 0rem 0.4rem;
  text-align: left;

  .historyBar {
    overflow: hidden;
    height: 0.6rem;
    padding-top: .1rem;
    p {
      
      float: left;
      font-size: 0.28rem;
      letter-spacing: 0rem;
      color: #333333;
    }
    img {
      width: 0.36rem;
      height: 0.36rem;
      float: right;
      font-size: 0.36rem;
    }
  }
  .buttonPanel {
    margin-top: -0.2rem;
  }
  .buttonItem {
    margin-top: 0.3rem;
    margin-left: 0rem;
    margin-right: 0.3rem;
    height: 0.6rem;
    // background-color: #ffffff;
    border-radius: 0.3rem;
    font-size: 0.26rem;
    // color: #666666;
    font-weight: normal;
    padding-left: 0.32rem;
    padding-right: 0.32rem;
  }
  .el-button {
    border: 1px solid #eeeeee;
    color: #888888;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 4rem;
  }
  .el-button:focus,
  .el-button:hover {
    color: #409eff;
    border-color: #c6e2ff;
    background-color: #ecf5ff;
  }
}
</style>