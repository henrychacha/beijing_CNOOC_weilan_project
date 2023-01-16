<template>
  <div class="courseItem">
    <a
      :href="item.live_back != 4 ? item.course_student : `#/series/${item.id}`"
      @click="handleSendClickRate({ is_course: item.is_course, id: item.id })"
    >
      <!-- <a href="javascript:;" v-for="item of img" :key="item.id">
      <p class="dealineTime" v-if="item.expire">
        倒计时: {{ editorDateTime(item.expire) }}
      </p>
      <img :src="item.imgUrl" :alt="item.title" />
      <p>{{ item.title }}</p>
      <p>{{ item.time }}</p>
    </a> -->
      <div class="outerBox">
        <el-card :body-style="{ padding: '0px' }" class="cardBox1">
          <!-- <div
        :style="{
          background: `url(${item.small_picture}) no-repeat`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }"
        class="image"
      ></div> -->
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

import Card from "../components/Card";
Date.prototype.toLocaleString = function () {
   let addZero = function(i){
        if(i<10){
          return '0' + i
        }else{
          return i
        }
      }
  return (
    // this.getFullYear() +
    // "-" +
    // (this.getMonth() + 1).toString().padStart(2, "0") +
    // "-" +
    // this.getDate().toString().padStart(2, "0") +
    // " " +
    // this.getHours().toString().padStart(2, "0") +
    // ":" +
    // this.getMinutes().toString().padStart(2, "0")
     this.getFullYear() +
    "-" +
    addZero((this.getMonth() + 1) )+
    "-" +
    addZero(this.getDate()) +
    " " +
    addZero(this.getHours()) +
    ":" +
    addZero(this.getMinutes())
  );
};
export default {
  props: ["item"],
  data() {
    return { t: null, timedown: "" };
  },
  components: {
    Card,
  },
  mounted() {
    this.renderTimeDown();
  },
  destroyed() {
    clearInterval(this.t);
  },
  methods: {
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
        str = `${day}:${h}:${min}:${s}`;
      } else {
        return `00:00:00:00`;
      }

      return str;
    },
  },
};
</script>

<style lang="scss" scoped>
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
  position: relative;
  width: 3.3rem;
  height: 3.34rem;
  margin-bottom: 0.3rem;
  background-color: #ffffff;
  box-shadow: 0rem 0.03rem 0.127rem 0.003rem rgba(5, 55, 81, 0.2);
  border-radius: 0.1rem;
  overflow: hidden;

  .image {
    width: 100%;
    height: 1.91rem;
    display: block;
  }
  .text {
    padding: 0.18rem 0.2rem 0rem 0.21rem !important;
    span {
      display: block;
    }
    > span {
      // display: inline-block;
      height: 0.7rem;
      font-size: 0.26rem;
      font-weight: normal;
      font-stretch: normal;
      line-height: 0.36rem;
      letter-spacing: 0rem;
      color: #333333;
      overflow: hidden;
      text-overflow: ellipsis;
      // white-space: nowrap;
      text-align: left;
    }
    .bottom1 {
      position: absolute;
      bottom: 0.18rem;
      right: 0.2rem;
      font-size: 0.22rem;
      height: 0.21rem;
      line-height: 0.18rem;
      .live {
        color: #0686c7;
        @extend .common;
        i {
          margin-right: 0.09rem;
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

/*
.itemBox {
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  align-items: center;
  justify-content: space-evenly;
  a {
    position: relative;
    display: block;
    width: calc(50% - 0.4rem);
    margin: 0.2rem;
    .dealineTime {
      position: absolute;
      right: 0;
      padding: 0 0.1rem;
      line-height: 0.4rem;
      background-color: #0065cb;
      color: white;
      font-size: 0.2rem;
    }
    img {
      height: 2rem;
      width: 100%;
    }
  }
}

*/
</style>