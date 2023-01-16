<template>
  <div>
    <div class="listcard">
      <img class="left" :src="item.small_picture" alt="" />
      <div class="right">
        <p class="top">{{ item.title }}</p>
        <p class="bottom">
          <span
            class="live"
            v-show="filterCourseStatus(item.live_back, item.timedown) == 0"
          >
            <i class="el-icon-s-data"></i>
            直播中
          </span>
          <span
            class="count"
            v-show="filterCourseStatus(item.live_back, item.timedown) == 1 && timedown"
          >
            <i class="el-icon-time"></i>
            {{ timedown }}
          </span>
          <span
            class="time"
            v-show="filterCourseStatus(item.live_back, item.timedown) == 2"
          >
            {{ new Date(item.timedown * 1000).toLocaleString() }}
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["item"],
  data() {
    return {
      t: null,
      timedown: "",
    };
  },
  mounted() {
    this.renderTimeDown();
  },
  destroyed() {
    clearInterval(this.t);
  },
  methods: {
    renderTimeDown() {
      this.t = setInterval(() => {
        this.timedown = this.editorDateTime(this.item.timedown * 1000);
        // console.log(data)
      }, 1000);
    },
    editorDateTime(date) {
      let addZero = function (item) {
        //补零
        if(item < 10){
          return '0' + item
        }else{
          return item
        }
        // return item.toString().padStart(2, "0");
      };
      let d = Date.parse(new Date());
      let week, day, h, min, s, str;
      let x = (date - d) / 1000;
      if (x >= 0) {
        s = addZero(x % 60);
        min = addZero(parseInt(x / 60) % 60);
        h = addZero(parseInt(x / (60 * 60)) % 24);
        day = addZero(parseInt(x / (60 * 60 * 24)));

        // day = addZero(parseInt(x / (60 * 60 * 24)) % 7);
        // week = addZero(parseInt(x / (60 * 60 * 24 * 7)));
        str = `${day}:${h}:${min}:${s}`;
      } else {
        return `00:00:00:00`;
      }

      return str;
    },
    filterCourseStatus(status, time) {
      let d = time * 1000 - Date.parse(new Date());
      if (status == 2) {
        //直播
        if (d > 0) {
          //直播时间还未到 ，显示倒计时
          return 1;
        } else {
          //直播时间已到，显示直播中
          return 0;
        }
      } else {
        //录播，显示灰色的时间
        return 2;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.common {
  float: right;
  letter-spacing: 0.012rem;
}
.listcard {
  display: flex;
  width: 7.5rem;
  height: 2.47rem;
  background-color: #ffffff;
  justify-content: center;
  align-items: center;
  margin-top: 0.1rem;

  .left {
    width: 2.8rem;
    height: 1.88rem;
    box-shadow: 0rem 0.05rem 0.127rem 0.003rem rgba(5, 55, 81, 0.35);
    border-radius: 0.1rem;
    background-color: #88abda;
    overflow: hidden;
  }
  .right {
    width: 3.63rem;
    height: 1.45rem;
    margin-left: 0.31rem;
    .top {
      height: 0.62rem;
      font-size: 0.28rem;
      line-height: 0.36rem;
      letter-spacing: 0rem;
      color: #333333;
      text-align: left;
    }
    .bottom {
      height: 0.36rem;
      padding-top: 0.62rem;
      overflow: hidden;
      font-size: 0.24rem;
      .live {
        height: 0.23rem;
        line-height: 0.23rem;
        color: #0686c7;
        @extend .common;
        i {
          margin-right: 0.11rem;
        }
      }
      .count {
        height: 0.19rem;
        line-height: 0.19rem;
        color: #ff0000;
        @extend .common;
        i {
          margin-right: 0.1rem;
        }
      }
      .time {
        height: 0.18rem;
        line-height: 0.18rem;
        color: #999999;
        @extend .common;
      }
    }
  }
}
</style>