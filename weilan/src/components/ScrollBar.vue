<template>
  <div>
    <div id="" class="scroll_wrap">
      <ul class="scroll_mine" v-if="taggle == 1">
        <li
          v-for="(item, index) in cardList"
          :key="index"
          :courseUrl="item.course_student"
          class="scroll_item"
        >
          <Card :item="item"/>
        </li>
      </ul>
      <ul class="nav_mine" v-if="taggle == 2">
        <li
          v-for="(item, index) in navList"
          :key="index"
          :id="flag == index ? 'test' : ''"
          :class="{ liObj: flag == index }"
          class="nav_item"
          @click="handleNav(index,{type_id:item.id})"
        >
          <span>{{ item.title_name }}</span>
        </li>
        <li
          class="liBottom li2"
          :style="`width:${liWidth}px;transform:translateX(${offsetW}px);`"
        ></li>
      </ul>
    </div>
  </div>
</template>

<script>
import Card from "../components/Card";
import { getNav } from "../utils/api.js";
import { getHotCourse } from "../utils/api.js";
export default {
  props: ["taggle"],
  data() {
    return {
      flag: 0,
      navList: [],
      cardList: [],
      liWidth: "",
      offsetW: "",
    };
  },
  components: {
    Card,
  },
  beforeMount() {},
  mounted() {
    if (this.taggle == 1) {
      this.renderHotCourse();
    } else {
      this.renderNav();
    }
  },
  updated() {
    // console.log('经过updat钩子')
    this.liWidth = document.getElementsByClassName("liObj")[0].offsetWidth;
    this.offsetW = document.getElementsByClassName("liObj")[0].offsetLeft;
  },
  methods: {
    handleNav(ind, data = { type_id: 0 }) {
      this.flag = ind;

      this.$nextTick(() => {
        // console.log('经过这里')
        this.liWidth = document.getElementsByClassName("liObj")[0].offsetWidth;
        this.offsetW = document.getElementsByClassName("liObj")[0].offsetLeft;
      });

      this.$emit("handleChangeCourseList", data);
    },
    async renderNav() {
      let d = await getNav();
      if (d.status == 200) {
        this.navList = d.data.data.list;
      }
    },
    async renderHotCourse() {
      let d = await getHotCourse();
      if (d.status == 200) {
        this.cardList = d.data.data;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.scroll_wrap {
  box-sizing: border-box;
  margin-top: 0.2rem;
  background-color: white;
}
.scroll_mine {
  display: flex;
  align-items: center;
  overflow-y: hidden;
  flex-wrap: nowrap;
  padding-bottom: 0.31rem;
  padding-left: 0.29rem;

  .scroll_item {
    margin-right: 0.31rem;
    white-space: nowrap;
  }

  // &::-webkit-scrollbar {
  //   display: none;
  // }
}
.nav_mine {
  position: relative;
  display: flex;
  align-items: center;
  overflow-y: hidden;
  flex-wrap: nowrap;
  .nav_item {
    background-color: #fff;
    font-weight: normal;
    color: #333333;
    span {
      display: block;
      height: 0.88rem;
      line-height: 0.88rem;
      width: 1.7rem;
      text-align: center;
      font-size: 0.28rem;

      font-stretch: normal;
      letter-spacing: 0rem;
    }
    &.liObj {
      font-weight: bolder;
    }
  }
  .liBottom {
    position: absolute;
    bottom: 0;
    width: 0.4rem;
    height: 0.03rem;
    background-color: #0686c7;
  }
  .li2 {
    transition-duration: 0.5s;
  }
  &::-webkit-scrollbar {
    display: none;
  }
}
</style>