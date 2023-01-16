<template>
  <div class="create">
    <div style="width: 100%">
      <ul class="ulStyle">
        <li
          :id="flag == 0 ? 'liWidth' : ''"
          :class="{ liObj: flag == 0 }"
          class="lis"
          @click="clickLI(0)"
        >
          精选商品
        </li>
        <li
          :id="flag == 1 ? 'liWidth' : ''"
          :class="{ liObj: flag == 1 }"
          class="lis"
          @click="clickLI(1)"
        >
          我的
        </li>
        <li
          :id="flag == 2 ? 'liWidth' : ''"
          :class="{ liObj: flag == 2 }"
          class="lis"
          @click="clickLI(2)"
        >
          我的超市
        </li>
        <li
          :id="flag == 3 ? 'liWidth' : ''"
          :class="{ liObj: flag == 3 }"
          class="lis"
          @click="clickLI(3)"
        >
          My Old Picture
        </li>
        <li
          class="liStyle li2"
          :style="`width:${width}px;transform:translateX(${offsetW}px);`"
        ></li>
      </ul>
    </div>
  </div>
</template>
<script>
import test from "./test";
export default {
  components: {
    Test: test,
  },
  data() {
    return {
      width: "",
      offsetW: "",
      flag: 0,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.width = document.getElementById("liWidth").offsetWidth;
      this.offsetW = document.getElementById("liWidth").offsetLeft;
    });
  },
  methods: {
    clickLI(id) {
      this.flag = id;
      this.$nextTick(() => {
        this.width = document.getElementById("liWidth").offsetWidth;
        this.offsetW = document.getElementById("liWidth").offsetLeft;
      });
      // this.$forceUpdate()
    },
    test01() {
      var myTimer = function (callback) {
        var height = 10;
        var flag = true;
        setInterval(function () {
          if (flag) {
            height--;
            if (height <= -10) {
              flag = false;
            }
          } else {
            height++;
            if (height >= 10) {
              flag = true;
            }
          }
          callback(height);
        }, 200);
      };

      myTimer(function (val) {
        console.log(val);
      });
    },
  },
};
</script>
<style scoped lang="scss">
.create {
  width: 100%;
  height: 100%;
}
.ulStyle {
  width: 100%;
  height: 50px;
  background: rgb(216, 211, 211);
  display: flex;
  position: relative;
  .lis {
    list-style: none;
    line-height: 50px;
    height: 50px;
    padding: 0 10px;
    margin: 0 5px;
    font-size: 14px;
    color: #000;
    cursor: pointer;
  }
  .liStyle {
    list-style: none;
    height: 3px;
    background: orangered;
    position: absolute;
    bottom: 0;
  }
  .li2 {
    transition-duration: 0.5s;
  }
  .liObj {
    color: orangered;
  }
}
</style>