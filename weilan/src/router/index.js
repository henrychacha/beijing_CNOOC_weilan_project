import Vue from "vue";
import Router from "vue-router";
import Index from "@/view/Index";
import Search from "@/view/Search";
import CompanyDetail from "@/view/CompanyDetail";
import SeriesCourse from '@/view/SeriesCourse';
import CourseDetail from '@/view/CourseDetail'
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Index",
      component: Index
    },
    {
      path: "/search",
      component: Search
    },
    {
      path: "/cdetail",
      component: CompanyDetail
    },
    {
      path:"/series/:uid",
      component:SeriesCourse
    },
    {
      path:'/csdetail',
      component:CourseDetail
    }
    // {
    //   path: "*",
    //   redirect: "/"
    // }
  ]
});
