import { get, post } from "./http.js";
const host = "http://vlane-admin.vguan.net"
const apiList = {
    // getBanner: `${host}/api/Banner/index`,
    // getNav: `${host}/api/Nav/index`,
    // getCourse: `${host}/api/Course/index`,
    // getAds: `${host}/api/Adver/index`,
    // getCourseSearch: `${host}/api/Course/search`,
    // getCompanyDetail: `${host}/api/Profile/index`,
    // getHotCourse: `${host}/api/Course/hotspot`,
    // getSeriesCourse: `${host}/api/Vod/index`,
    // getCourseRate:`${host}/api/Course/click_sum`,
    // getWxConfigApi:'https://v.vguan.net/api/wx/share',
  getBanner: "/api/Banner/index",
  getNav: "/api/Nav/index",
  getCourse: "/api/Course/index",
  getAds: "/api/Adver/index",
  getCourseSearch: "/api/Course/search",
  getCompanyDetail: "/api/Profile/index",
  getHotCourse: "/api/Course/hotspot",
  getSeriesCourse: "/api/Vod/index",
  getCourseRate:'/api/Course/click_sum',
  getWxConigApi:'https://v.vguan.net/api/wx/share',
};

/* 
  首页直播大厅
*/

// 广告植入
let getAds = async data => await post(apiList["getAds"], data);

// 获取首页轮播图

let getBanner = async data => await post(apiList["getBanner"], data);
// 获取导航栏

let getNav = async data => await post(apiList["getNav"], data);
// 获取课程列表
/* 
  字段   类型 描述
  limit	int	每页数据条数（默认20，非必填项）
  page	int	当前页码（非必填项）

*/
let getCourse = async data => await post(apiList["getCourse"], data);

// 获取课程搜索
/*
字段	 类型	    描述
limit	 int	  每页数据条数（默认20，非必填项）

page	 int	  当前页码（非必填项）

title	string	课程标题（必填项，模糊搜索）
*/
let getCourseSearch = async data =>
  await post(apiList["getCourseSearch"], data);

// 公司简介
let getCompanyDetail = async data =>
  await post(apiList["getCompanyDetail"], data);

// 获取热门课程
let getHotCourse = async data => await post(apiList["getHotCourse"], data);

// 获取系列课程
/* 
字段  	类型  	描述
limit	  int	    每页数据条数（默认10）

page  	int	      当前页码

type_id	string	  导航栏id
*/
let getSeriesCourse = async data =>
  await post(apiList["getSeriesCourse"], data);

// 增加课程点击率
let getCourseRate = async data => await post(apiList['getCourseRate'],data);

// 调用微信分享接口
let getWxConfigApi = async data => await post(apiList["getWxConfigApi"],data);

export {
  getBanner,
  getNav,
  getCourse,
  getAds,
  getCourseSearch,
  getCompanyDetail,
  getHotCourse,
  getSeriesCourse,
  getCourseRate,
  getWxConfigApi,
};
