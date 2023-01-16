<template>
  <div>
    <!-- <PhoneBar /> -->
    <TopBar :name="'系列课程'" :arrowTaggle="true" />
    <div class="body">
      <img class="image" :src="this.image" />
      <h2>{{ name }}</h2>
    </div>

    <CourseList :list="courseList" />
    <Loading v-show="flagLoading" :taggleLoading="taggleLoading" />
    <AlertNone v-show="flagAlert" :taggleAlert="taggleAlert" />
    <BackTop />
  </div>
</template>

<script>
import BackTop from "@/components/BackTop";
import Loading from "@/components/Loading";
import AlertNone from "@/components/AlertNone";
import PhoneBar from "@/components/PhoneBar";
import TopBar from "@/components/TopBar";
import CourseList from "../components/CourseList";
import { getSeriesCourse, getWxConfigApi } from "@/utils/api.js";
import wxApi from "@/utils/wxApi.js";

export default {
  components: {
    PhoneBar,
    TopBar,
    CourseList,
    Loading,
    AlertNone,
    BackTop,
  },
  data() {
    return {
      uid: 28,
      image: "",
      name: "",
      courseList: "",
      limitMax: "",
      limit: 10,
      flagLoading: false,
      flagAlert: false,
      taggleLoading: 1,
      taggleAlert: 0,
      waitingTaggle: false,
      wxoption: {
        title: "系列课程",
        desc: "系列课程",
        link: window.location.href,
      },
    };
  },
  created() {
    this.shareWxApi();
  },
  mounted() {
    //   console.log(this.$route)
    // this.renderSeriesCourse({ type_id: this.uid });
    window.addEventListener("scroll", this.handleScroll);
    this.renderSeriesCourse({
      type_id: this.$route.params.uid,
      limit: this.limit,
    });
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    async shareWxApi() {
      let d = await getWxConfigApi(`url=${window.location.href}` );
      wxApi.wxRegister(d.data, this.wxoption);
    },
    handleScroll() {
      let winScrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      if (winScrollTop + window.innerHeight + 1 > document.body.offsetHeight) {
        // console.log("拉倒底部啦啦啦");
        if (this.waitingTaggle == true) {
          if (this.limit <= this.limitMax) {
            this.limit = this.limit + 10;
            this.renderSeriesCourse02({
              limit: this.limit,
              type_id: this.$route.params.uid,
            });
          } else {
            // console.log("系列课程没有更多了");
            if (this.flagLoading == false) {
              this.flagAlert = true;
            }
          }
        }
      }
    },
    async renderSeriesCourse02(data) {
      this.flagLoading = true;
      this.waitingTaggle = false;
      let d = await getSeriesCourse(data);
      if (d.status == 200) {
        this.flagLoading = false;
        this.waitingTaggle = true;
        this.courseList = d.data.data.list;
      }
    },
    async renderSeriesCourse(data) {
      this.waitingTaggle = false;
      this.flagLoading =true
      let d = await getSeriesCourse(data);
      if (d.status == 200) {
        this.waitingTaggle = true
        this.flagLoading =false
        this.limitMax = d.data.data.count;
        this.image = d.data.data.nav.image;
        this.name = d.data.data.nav.title_name;
        this.courseList = d.data.data.list;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.body {
  background-color: white;
  margin-top: 0.02rem;
  padding-top: 0.3rem;
  padding-bottom: 0.4rem;
  border-bottom: 0.1rem solid #eeeeee;
  .image {
    width: 6.9rem;
    height: 3.9rem;
    background-color: #88abda;
    border-radius: 0.1rem;
    margin: 0 auto;
  }
  h2 {
    margin-top: 0.3rem;
    margin-left: 0.29rem;
    text-align: left;
    font-size: 0.34rem;
    font-weight: normal;
    font-stretch: normal;
    line-height: 0.36rem;
    letter-spacing: 0rem;
    color: #333333;
  }
}
</style>