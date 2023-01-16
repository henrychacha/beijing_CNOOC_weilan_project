<template>
  <div>
    <ScrollBar
      @handleChangeCourseList="handleChangeCourseList"
      :taggle="taggle"
    />
    <CourseList :list="courseList" />
    <Loading :taggle="taggleLoading" v-show="flagLoading" />
    <AlertNone v-if="flagAlert" :taggleAlert="taggleAlert" />
  </div>
</template>

<script>
import AlertNone from "../components/AlertNone";
import CourseList from "../components/CourseList";
import ScrollBar from "../components/ScrollBar";
import Loading from "../components/Loading";
import { getCourse } from "../utils/api";
export default {
  props: ["taggle"],
  components: {
    CourseList,
    ScrollBar,
    Loading,
    AlertNone,
  },
  data() {
    return {
      activeName: "first",
      courseList: [],
      page: 1,
      type_id: 1,
      limit: 10,
      flag: true, //控制是否继续调取数据
      flagLoading: false,
      flagAlert: false,
      taggleLoading: "",
      taggleAlert: "",
      waitingTaggle: false,
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
    this.renderGourse({ type_id: 1 });
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      let winScrollTop =window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      if (
        // document.documentElement.scrollTop + window.innerHeight ==
        // document.body.offsetHeight
        winScrollTop + window.innerHeight + 1 > document.body.offsetHeight
      ) {
        // this.page = this.page + 1;
        if (this.waitingTaggle == true) {
          this.page = this.page + 1;
          let { page, type_id } = this;
          if (this.flag) {
            this.renderCourse02({ page, type_id });
          } else {
            // console.log("已经没有了");
            this.taggleAlert = 0;
          }
        }
      }
    },
    handleClick(tab, event) {},
    handleChangeCourseList(data) {
      this.renderGourse(data);
    },
    async renderCourse02(data) {
      this.flagLoading = true;
      this.waitingTaggle = false
      let d = await getCourse(data);
      if (d.status == 200) {
        // console.log("请求数据成功");
        this.flagLoading = false;
        this.waitingTaggle = true
        this.courseList = this.courseList.concat(d.data.data.list);
        if (d.data.data.list.length == 0) {
          // console.log("已经没有数据了");
          if (this.flagLoading == false) {
            this.flagAlert = true;
          }
          this.flag = false;
        }
      }
    },
    async renderGourse(data) {
      this.type_id = data.type_id;
      this.page = 1;
      this.flag = true;
      this.flagAlert = false;
      this.flagLoading = true;
      this.waitingTaggle = true
      let d = await getCourse(data);
      if (d.status == 200) {
        this.flagLoading = false;
        this.courseList = d.data.data.list;
        if (d.data.data.list.length == 0) {
          // console.log("已经没有数据了");
          thi.flag = false;
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.navBarTitle {
  background-color: white;
  margin-top: 0.2rem;
  height: 0.88rem;
}
.el-tabs__item {
  height: 0.88rem;
  width: 1.7rem;
  line-height: 0.88rem;
  text-align: center;
  padding: 0;
  font-size: 0.28rem;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0rem;
  color: #333333;
}
.el-tabs__nav-wrap::after {
  height: 0.1rem;
}
</style>