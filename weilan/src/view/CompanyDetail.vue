<template>
  <div class="companyDetail">
    <!-- <PhoneBar /> -->
    <TopBar :name="'公司简介'" :arrowTaggle="true" />

    <div class="body" v-for="(item, index) in companyDetailList" :key="index">
      <img :src="`${item.iamge}`" alt="" />
      <h2 class="companyName">{{ item.name }}</h2>
      <p class="phoneNumber">电话: {{ item.telephone }}</p>
      <p class="email">邮件: {{ item.email }}</p>
      <p class="address">地址: {{ item.address }}</p>
      <p class="introduce" v-html="item.introduce"></p>
    </div>
  </div>
</template>

<script>
import PhoneBar from "@/components/PhoneBar";
import TopBar from "@/components/TopBar";
import wxApi from "@/utils/wxApi.js";
import { getCompanyDetail, getWxConfigApi } from "../utils/api";
export default {
  components: {
    TopBar,
    PhoneBar,
  },
  data() {
    return {
      companyDetailList: [],
      wxoption: {
        title: "公司简介",
        desc: "未蓝公司简介",
        link: window.location.href,
      },
    };
  },
  created() {
    this.shareWxApi();
  },
  mounted() {
    this.renderDetail();
  },
  methods: {
    async renderDetail() {
      let d = await getCompanyDetail();
      if (d.status == 200) {
        // console.log(d);
        // console.log(d.data.data.list);
        this.companyDetailList = d.data.data.list;
      }
    },
    async shareWxApi() {
      let d = await getWxConfigApi(`url=${window.location.href}` );
      wxApi.wxRegister(d.data, this.wxoption);
    },
  },
};
</script>

<style lang="scss" scoped>
.phoneBar {
  height: 0.4rem;
  background-color: #ffffff;
}

.companyDetail {
  background-color: #ffffff;
  .body {
    border-top: 0.02rem solid #eeeeee;
    font-size: 0.28rem;
    font-weight: normal;
    line-height: 0.28rem;
    letter-spacing: 0.028rem;
    color: #666666;
    text-align: left;
    img {
      display: block;
      margin: 0 auto;
      width: 6.9rem;
      height: 3rem;
      margin-top: 0.3rem;
      // background-color: #88abda;
      border-radius: 0.1rem;
    }
    .companyName {
      margin-top: 0.39rem;
      text-align: center;
      font-size: 0.36rem;
      font-weight: normal;
    }
    .phoneNumber {
      margin-top: 0.49rem;
      margin-left: 0.91rem;
    }
    .email {
      margin-top: 0.33rem;
      margin-left: 0.91rem;
    }
    .address {
      width: 6.78rem;
      margin-top: 0.3rem;
      margin-left: 0.91rem;
      // line-height: 0.48rem;
    }
    .introduce {
      text-indent: 0.6rem;
      margin-top: 0.33rem;
      margin-left: 0.32rem;
      padding-bottom: 3.37rem;
      width: 6.78rem;
      line-height: 0.48rem;
    }
  }
}
</style>