<template>
  <div>
    <a
      :href="item.live_back != 4 ? item.course_student : `#/series/${item.id}`"
      @click="handleSendClickRate({ is_course: item.is_course, id: item.id })"
    >
      <div class="outerBox">
        <el-card :body-style="{ padding: '0px' }" class="cardBox1">
          <img :src="item.small_picture" alt="" class="image" />
          <div style="padding: 14px" class="text">
            <span>{{ item.title }}</span>
            <div class="bottom1">
              <span
                class="live"
                v-show="filterCourseStatus(item.live_back, item.timedown) == 0"
              >
                <i class="el-icon-s-data"></i>
                直播中
              </span>
              <span
                class="count"
                v-show="
                  filterCourseStatus(item.live_back, item.timedown) == 1 &&
                  timedown
                "
              >
                <i class="el-icon-time"></i>
                {{ timedown }}
              </span>
              <span
                class="time"
                v-show="filterCourseStatus(item.live_back, item.timedown) == 2"
              >
              <!-- {{this.changeTimeFormat(new Date(item.timedown*1000))}} -->
                {{ new Date(item.timedown * 1000).toLocaleString() }}
              </span>
            </div>
          </div>
        </el-card>
        <i class="seriesMark" v-if="item.live_back == 4"></i>
      </div>
    </a>
  </div>
</template>

<script>
import { getCourseRate } from "@/utils/api.js";
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
    // changeTimeFormat(d){
    //   let addZero = function(i){
    //     if(i<10){
    //       return '0' + i
    //     }else{
    //       return i
    //     }
    //   }
    //   let changeDate = d.getFullYear() + '-' + addZero((d.getMonth() + 1)) + '-' + addZero(d.getDate()) + ' ' + addZero(d.getHours()) + ':' + addZero(d.getMinutes());
    //   return changeDate
    // },
    async handleSendClickRate(data) {
      let d = await getCourseRate(data);
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
  },
};
</script>

<style lang='scss'scoped >
.common {
  float: right;
  letter-spacing: 0.012rem;
}
.outerBox {
  position: relative;
  .seriesMark {
    position: absolute;
    top: 0.2rem;
    right: -0.05rem;
    width: 0.89rem;
    height: 0.41rem;
    background: url("../assets/image/images/series-mark.png");
    background-size: 100% 100%;
  }
}
.cardBox1 {
  width: 3.6rem;
  height: 2.81rem;
  background-color: #ffffff;
  box-shadow: 0rem 0.03rem 0.127rem 0.003rem rgba(5, 55, 81, 0.2);
  border-radius: 0.1rem;
  overflow: hidden;
  .image {
    width: 100%;
    height: 1.71rem;
    display: block;
  }
  .text {
    padding: 0.21rem 0.19rem 0rem 0.21rem !important;
    span {
      display: block;
    }
    > span {
      height: 0.30rem;
      font-size: 0.26rem;
      font-weight: normal;
      font-stretch: normal;
      line-height: 0.30rem;
      letter-spacing: 0rem;
      color: #333333;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      text-align: left;
    }
    .bottom1 {
      margin-top: 0.27rem;
      font-size: 0.2rem;
      height: 0.18rem;
      line-height: 0.18rem;
      .live {
        color: #0686c7;
        @extend .common;
        i {
          margin-right: 0.11rem;
        }
      }
      .count {
        color: #ff0000;
        @extend .common;
        i {
          margin-right: 0.1rem;
        }
      }
      .time {
        color: #999999;
        @extend .common;
      }
    }
  }
}
</style>