/**
 * 微信js-sdk
 * 参考文档：https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141115
 */
import wx from "weixin-js-sdk";
const wxApi = {
  /**
   * [wxRegister 微信Api初始化]
   * @param  {Function} callback [ready回调函数]
   */
  wxRegister(data, option) {
    //data是微信配置信息，option是分享的配置内容

    //  console.log(data,option)
    // wx.config(data);
    wx.config({
      debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: data.appId,
      timestamp: data.timestamp,
      nonceStr: data.nonceStr,
      signature: data.signature,
      jsApiList: data.jsApiList
    });
    // 在这里调用 API
    var shareData = {
      title: option.title,
      desc: option.desc,
      link: option.link,
      imgUrl:
        "http://vod.vguan.net/link/j52020124714574755/1c3ab863ceb2c096094020527eeca21b.jpeg"
    };
    // 分享给朋友
    wx.onMenuShareAppMessage(shareData);
    // 分享到朋友圈
    wx.onMenuShareTimeline(shareData);
    /*
    wx.ready(function() {
     
    
      //通过checkJsApi判断当前客户端版本是否支持指定获取地理位置
      wx.checkJsApi({
        jsApiList: ["getLocation", "checkJsApi"],
        success: function(res) {
          if (res.checkResult.getLocation == false) {
            alert(
              "你的微信版本太低，不支持微信JS接口，请升级到最新的微信版本！"
            );
            return;
          }
        }
      });
    });
    */
  }
};
export default wxApi;
