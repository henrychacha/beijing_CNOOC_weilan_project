<template>
  <div>
    <p v-show="false">{{ CountDown }}</p>
    //辅助倒计时用于刷新

    <div class="list" v-for="(item, index) in MerchantDemandList" :key="index">
      <div class="listPush">
        <div v-show="item.status == 1">{{ item.message1 }}</div>
        <div v-show="item.status == 1">
          {{ Djs_timeList(item.project_time3_str) }}

          <!-- {{item.project_time3_str}} -->
        </div>
        <div v-show="item.status != 1">{{ item.message1 }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      token_centent: JSON.parse(sessionStorage.getItem("loginInformation")), //token
      status_type: "", //预约状态
      status_message1: "", //预约显示的文字
      ifCountDown: 0,
      CountDown: "", //辅助倒计时用于刷新
    };
  },
  methods: {
    initList() {
      var that = this;
      api
        .post("/api/sssss/sssssss/", {
          //服务详情
          source: 1,
          token: that.token_centent.token, //Token
          uuid: that.businessUuid, //UUID
        })
        .then(function (res) {
          if (res.data.code == 1000) {
            that.Djs_time(); //辅助列表倒计时
            that.status_message1 = res.data.data.message1;
            that.Djs_time(); //获取数据后调用单个的倒计时
            setTimeout(that.Djs_timeList, 1000); //倒计时列表，多个
          }
        });
    },
    Djs_time: function () {
      setInterval(() => {
        var presentTime = new Date().getTime();
        this.CountDown = presentTime;
      }, 1000);
    },
    Djs_timeList: function (itemEnd) {
      var endItem = new Date(itemEnd).getTime(); //获取列表传的截止时间
      var nowItem = new Date().getTime(); //获取当前时间
      var rightTime = endItem - nowItem; //截止时间减去当前时间
      if (rightTime > 0) {
        //判断剩余倒计时时间如果大于0就执行倒计时否则就结束
        var dd = Math.floor(rightTime / 1000 / 60 / 60 / 24);
        var hh = Math.floor((rightTime / 1000 / 60 / 60) % 24);
        var mm = Math.floor((rightTime / 1000 / 60) % 60);
        var ss = Math.floor((rightTime / 1000) % 60);
        var showTime = dd + "天" + hh + "小时" + mm + "分" + ss + "秒";
        // this.MerchantDemandList.status=1
      } else {
        var showTime = "预约已结束";
        // this.MerchantDemandList.status=0
      }
      return showTime;
    },
  },
  mounted() {
    this.initList();
  },
  //离开页面后清除定时器
  destroyed() {
    clearInterval();
  },
};
</script>

<style>
</style>