<template>
  <div>
    <div
      v-show="taggle"
      id="goTop"
      class="goTop"
      @click="handleBackTop()"
    ></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      taggle: false,
      scroll: 0,
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed(){
    window.removeEventListener('scroll',this.handleScroll);
  },
  methods: {
    handleBackTop() {
      // console.log(document.body.scrollTop)
      let top = document.documentElement.scrollTop || document.body.scrollTop;
      const timeTop = setInterval(() => {
        document.body.scrollTop = top -= 50;
        document.documentElement.scrollTop = top -= 50;

        if (top <= 0) {
          clearInterval(timeTop); //清除定时器
        }
      }, 10);
    },
    showButton() {
      let top = document.documentElement.scrollTop || document.body.scrollTop;
      if (top > 400) {
        this.taggle = true;
      } else {
        this.taggle = false;
      }
    },
    handleScroll() {
      this.showButton();
    },
  },
};
</script>

<style lang="scss" scoped>
.goTop {
  position: fixed;
  right: 0.3rem;
  bottom: 0.6rem;
  width: 0.8rem;
  height: 0.8rem;
  background: url("../assets/image/images/backToTopButton.png") left top;
  background-size: 100%;
}
</style>