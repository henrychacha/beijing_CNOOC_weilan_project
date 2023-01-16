<template>
  <div :class="['searchBox']">
    <img
      v-if="this.$route.path == '/search'"
      @click="handleCancel()"
      class="arrow"
      src="../assets/image/images/weilan-left-arrow.gif"
      alt=""
    />

    <div
      class="inputBox inputTrans"
      :style="{ width: value.length != 0 ? '5rem' : '6.39rem' }"
    >
      <i class="el-icon-search"></i>
      <input
        @keyup.enter="handleSubmit()"
        type="text"
        placeholder="请输入标题关键字"
        v-model.trim="value"
        v-focus
      />
      <img
        @click="handleDeleteInput()"
        class="delete"
        v-show="value.length != 0"
        src="../assets/image/images/weilan-delete-icon.gif"
        alt=""
      />
    </div>
    <em class="seachButton" v-show="value.length != 0" @click="handleSubmit()"
      >搜索</em
    >
  </div>
</template>

<script>
export default {
  props: ["valueprop", "handleChangeStorage"],
  data() {
    return {
      value: "",
    };
  },
  watch: {
    valueprop() {
      // console.log(this.valueprop,222)
      this.value = this.valueprop;
      // console.log(this.value)
    },
  },
  directives: {
    focus: {
      //input自动聚焦
      inserted: (el, binding, vnode) => {
        if (vnode.context.$route.path == "/search") {
          el.focus();
        }
      },
    },
  },
  mounted() {},
  methods: {
    handleSubmit() {
      if (this.value.length == 0) {
        return;
      } else {
        this.$emit("handleChangeStorage", this.value);
      }

      this.value = "";
    },
    handleCancel() {
      this.$emit("handleCancel");
    },
    handleDeleteInput() {
      this.value = "";
    },
  },
};
</script>

<style lang="scss" scoped>
$colorbg: #409eff;
$width: 100%;
$height: 0.88rem;
.searchBox {
  position: relative;
  height: $height;
  width: $width;
  margin: 0 auto;
  background-color: white;
  font-size: 0.2rem;
  font-weight: bolder;
  .arrow {
    width: 0.2rem;
    height: 0.36rem;
    position: absolute;
    top: 0.26rem;
    left: 0.3rem;
    font-size: 0.36rem;
    color: #999999;
    font-weight: 500;
  }

  .inputBox {
    &.inputTrans {
      transition-duration: 0.1s;

      &.changeInputStyle {
        width: 5rem;
      }
      position: absolute;
      display: flex;
      align-items: center;
      left: 0.87rem;
      right: 0.29rem;
      top: 0.14rem;
      background-color: #e9e9e9;
      border-radius: 0.3rem;
      height: 0.6rem;
      overflow: hidden;
      caret-color: #0686c7;
      > i {
        position: absolute;
        left: 0.2rem;
        top: 0.16rem;
        font-size: 0.27rem;
        color: #999999;
      }
      input {
        margin-left: 0.67rem;
        margin-right: 0.85rem;
        font-size: 0.23rem;
        flex-grow: 1;
        height: 0.28rem;
        background-color: #e9e9e9;
      }
      .delete {
        position: absolute;
        top: 0.18rem;
        right: 0.3rem;
        width: 0.24rem;
        height: 0.24rem;
      }
    }
  }
  em.seachButton {
    position: absolute;
    // box-sizing: border-box;
    padding-top: 0.2rem;
    font-size: 0.26rem;
    right: 0.26rem;
    top: 0.14rem;
    width: 1.19rem;
    height: 0.4rem;
    background-color: #0686c7;
    border-radius: 0.3rem;
    color: white;
  }
}
</style>