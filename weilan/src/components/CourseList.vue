<template>
  <ul class="courseList">
    <!-- <li v-for="(item, index) in courseList" :key="index">
      <CourseItem :item="item" />
    </li> -->
    <li v-for="(item, index) in list" :key="index">
      <CourseItem :item="item" />
    </li>
  </ul>
</template>

<script>
import CourseItem from "@/components/CourseItem.vue";

export default {
  props: ["taggle", "list"],
  data() {
    return {
      seriesCourseList: [],
    };
  },
  components: {
    CourseItem,
  },
  mounted() {
   
  },
  methods: {
   
  },
};
</script>

<style lang="scss" scoped>
.courseList {
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  align-items: center;
  justify-content: left;
  background-color: #fff;
  margin-top: 0.1rem;
  padding-top: 0.19rem;

  li {
    margin-left: 0.27rem;
  }
}
</style>