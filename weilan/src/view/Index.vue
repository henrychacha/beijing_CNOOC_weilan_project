<template>
  <div class="main">
    <!-- <Test /> -->
    <!-- <PhoneBar /> -->
    <TopBar :name="'未蓝传播'" :arowTaggle="false" />
    <!-- <div class="headerSearch">
      <SearchBar />
    </div> -->
    <Carousel />
    <div class="hotContentBox">
      <h1 class="hotContent">热点内容</h1>
      <ScrollBar :taggle="1"> </ScrollBar>
    </div>

    <NavBar :taggle="2" />
    <MessageBox />
    <BackTop />
  </div>
</template>
    
<script>
// import Test from '../components/Test';
import TopBar from "../components/TopBar";
import Carousel from "../components/Carousel";
import NavBar from "../components/NavBar";
import SearchBar from "../components/SearchBar";
import MessageBox from "../components/MessageBox";
import BackTop from "../components/BackTop";
import ScrollBar from "../components/ScrollBar";
import Card from "@/components/Card";
import PhoneBar from "@/components/PhoneBar";
import  wxApi from "@/utils/wxApi.js";
import { getWxConfigApi } from "@/utils/api.js";

// console.log(getBanner,111)

export default {
  components: {
    Carousel,
    NavBar,
    SearchBar,
    MessageBox,
    BackTop,
    ScrollBar,
    TopBar,
    Card,
    PhoneBar,
  },
  data() {
    return {
      wxoption: {
        title: "未蓝直播",
        desc: "未蓝直播大厅123",
        link: window.location.href,
      },
    };
  },
  created() {
   this.shareWxApi();
  },
  mounted() {
     
  },
  methods: {
    async shareWxApi() {
      // let d = await getWxConfigApi({ data: `url=${window.location.href}` });
      let d = await getWxConfigApi(`url=${window.location.href}`);

      console.log('微信分享',d)
      wxApi.wxRegister(d.data.data, this.wxoption);
    },
  },
};
</script>

<style lang='scss' scoped>
$colorbg: #409eff;

.main {
  position: relative;
  background-color: #eeeeee;
  border: none;
  .phoneBar {
    height: 0.4rem;
    background-color: #ffffff;
  }
  .headerSearch {
    // background-color: $colorbg;
    position: absolute;
    top: -0.8rem;
    width: 100%;
  }

  .hotContentBox {
    box-sizing: border-box;
    height: 4rem;
    padding-top: 0.3rem;
    margin-top: 0.1rem;
    background: #ffffff;

    .hotContent {
      text-align: left;
      padding-left: 0.29rem;
      height: 0.28rem;
      font-size: 0.3rem;
      font-weight: 500;
      font-stretch: normal;
      letter-spacing: 0rem;
      color: #333333;
    }
  }
}
</style>