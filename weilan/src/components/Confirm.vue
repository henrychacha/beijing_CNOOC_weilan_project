<template>
  <div class="container" >
    <div class="confirmbox">
      <p class="top">确认删除全部历史？</p>
      <p class="bottom">
        <i class="cancel" @click="handleCancelDelete()">取消</i>
        <i class="confirm" @click="handleConfirm()">确认</i>
      </p>
    </div>
    <div class="greyBackground"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    
    };
  },
  methods: {
    handleCancelDelete() {
        this.$emit('handleCancelDelete')
    },
    handleConfirm() {
        this.$emit('handleConfirmDeleteHistory')
    },
  },
};
</script>

<style lang="scss" scoped>
$bg-color: #fff;
$confirm-btn-color: #0985c6;
$color: #ffffff;
$icon-color: #fff;
$cancel-btn-color:#EEEEEE;
.confirmbox {
  position: fixed;
  display: flex;
  flex-direction: column;
  left: 0;
  right: 0;
  top: 0rem;
  bottom: 0;
  margin: auto;
  z-index: 999;
  width: 5.8rem;
  height: 3rem;
  border-radius: .1rem;
  background-color: $bg-color;
  // border: 2px solid $color;
  text-align: center;
  font-size: .32rem;
  overflow: hidden;
  .top {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 3;
  }
  .bottom {
    display: flex;
    flex: 1;

    .cancel {
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 1;
      background-color: $cancel-btn-color;
    }
    .confirm {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: $confirm-btn-color;
      color: #fff;
    }
  }
}
.greyBackground {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 99;
  background-color: black;
  opacity: 0.4;
}
</style>