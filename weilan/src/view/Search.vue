<template>
  <div class="main02">
    <!-- <PhoneBar /> -->
    <div class="headerSearch">
      <SearchBar
        @handleChangeStorage="handleChangeStorage"
        @handleCancel="handleCancel"
        :valueprop="value"
      />
    </div>
    <SearchHistory
      v-show="taggle"
      @handleSearchBar="handleSearchBar"
      @handleDeleteHistory="handleDeleteHistory"
      :searchHistoryList="searchHistoryList"
      :deleteHistoryTaggle="deleteHistoryTaggle"
    />
    <Confirm
      @handleCancelDelete="handleCancelDelete"
      @handleConfirmDeleteHistory="handleConfirmDeleteHistory"
      v-show="showDeleteConfirm"
    />
    <ul v-if="!taggle">
      <li>
        <a
          v-for="(item, index) in SearchReasultList"
          :key="index"
          :href="
            item.live_back != 4 ? item.course_student : `#/series/${item.id}`
          "
          @click="
            handleSendClickRate({ is_course: item.is_course, id: item.id })
          "
        >
          <ListCard :item="item" />
        </a>
      </li>
    </ul>
    <Loading :taggleLoading="taggleLoading" v-show="flagLoading" />
    <AlertNone v-show="flagAlert" :taggleAlert="taggleAlert" />
    <BackTop />
  </div>
</template>

<script>
import BackTop from "@/components/BackTop";
import AlertNone from "@/components/AlertNone";
import Loading from "@/components/Loading";
import PhoneBar from "@/components/PhoneBar";
import SearchBar from "@/components/SearchBar";
import SearchHistory from "@/components/SearchHistory";
import Confirm from "@/components/Confirm";
import wxApi from "@/utils/wxApi.js";
import ListCard from "@/components/ListCard";
import { getCourseSearch, getCourseRate, getWxConfigApi } from "../utils/api";
export default {
  components: {
    SearchBar,
    SearchHistory,
    Confirm,
    ListCard,
    PhoneBar,
    Loading,
    AlertNone,
    BackTop,
  },
  data() {
    return {
      showDeleteConfirm: false,
      value: "", //点击了哪个的历史记录
      searchHistoryList:
        JSON.parse(localStorage.getItem("searchHistoryList")) || [], //存放搜索历史记录
      SearchReasultList: [],
      taggle: true, //开关，控制历史记录与搜索结果
      flagLoading: false,
      flagAlert: false,
      val: "",
      limit: 10,
      limitMax: "",
      taggleAlert: "",
      taggleLoading: "",
      waitingTaggle: false,
      wxoption: {
        title: "搜索结果",
        desc: "未蓝直播搜索",
        link: window.location.href,
      },
    };
  },
  computed: {
    deleteHistoryTaggle: {
      get() {
        return this.searchHistoryList.length == 0 ? false : true;
      },
      set() {},
    },
  },
  created() {
    this.shareWxApi();
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    async handleSendClickRate(data) {
      let d = await getCourseRate(data);
    },
    async shareWxApi() {
      let d = await getWxConfigApi( `url=${window.location.href}` );
      wxApi.wxRegister(d.data, this.wxoption);
    },
    handleScroll() {
      let winScrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
        // console.log(winScrollTop,window.innerHeight,document.body.offsetHeight)
      if (winScrollTop + window.innerHeight + 1 > document.body.offsetHeight) {
        
        if (this.waitingTaggle == true) {
          if (this.limit <= this.limitMax) {
            this.limit = this.limit + 10;
            this.renderCourseSearch02({ limit: this.limit, title: this.val });
          } else {
            this.flagAlert = true;
            this.taggleAle;
          }
        }
      }
    },
    handleSearchBar(item) {
      this.value = item;
    },
    handleCancel() {
      this.$router.push({ path: "/" });
    },
    handleChangeStorage(item, limit = 10) {
      this.limit = 10;
      this.taggle = false;
      this.val = item;
      this.renderCourseSearch({ title: item, limit });
      let arr = JSON.parse(localStorage.getItem("searchHistoryList")) || [];
      let r = arr.findIndex((i) => {
        return i == item;
      });
      if (r != -1 || item == "") {
        //在localStorage中已经存在
      } else {
        arr.unshift(item);
        localStorage.setItem("searchHistoryList", JSON.stringify(arr));
        this.searchHistoryList = JSON.parse(
          localStorage.getItem("searchHistoryList")
        );
      }
      this.value = "";
    },
    handleCancelDelete() {
      this.showDeleteConfirm = false;
    },
    handleDeleteHistory() {
      this.showDeleteConfirm = true;
    },
    handleConfirmDeleteHistory() {
      localStorage.removeItem("searchHistoryList");
      this.searchHistoryList = [];
      this.deleteHistoryTaggle = !this.deleteHistoryTaggle;
      this.value = "";
      this.showDeleteConfirm = false;
    },
    async renderCourseSearch02(data) {
      this.flagLoading = true;
      this.waitingTaggle = false;
      let d = await getCourseSearch(data);
      if (d.status == 200) {
        this.flagLoading = false;
        this.waitingTaggle = true;
        this.SearchReasultList = d.data.data.list;
      }
    },
    async renderCourseSearch(data) {
      this.flagAlert = false;
      this.flagLoading = true;
      this.waitingTaggle = true;
      let d = await getCourseSearch(data);
      if (d.status == 200) {
        this.flagLoading = false;
        this.limitMax = d.data.data.count;
        if (d.data.data.list.length == 0) {
          this.flagAlert = true;
          this.taggleAlert = 1;
        }
        this.SearchReasultList = d.data.data.list;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
$colorbg: #eeeeee;
.main02 {
  // position: relative;
  background-color: $colorbg;
  // border-width: 1rem 0.2rem 0rem 0.2rem;
  // border-color: $colorbg;
  // border-style: solid;
  // height: 6rem;
  .phoneBar {
    height: 0.4rem;
    background-color: #ffffff;
  }
  .headerSearch {
    // position: absolute;
    // top: -0.8rem;
    background-color: white;
    width: 100%;
  }
}
</style>