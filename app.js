// 引用log.js日志文件
var log = require('utils/log.js') 
//app.js
App({
  onLaunch: function () {
    //首次进入时更新麻醉方法
    wx.setStorageSync("anesthetics", null);
    //自动登录
    var _this = this;
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          url: _this.globalData.baseUrl+'xcx/autoLogin',
          method: 'POST',
          data: {
            code: res.code
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          dataType:'json',
          success (res1) {
            console.log(res1.data);
            if(res1.data.code == 0){
              log.info("自动登录成功，loginName:"+res1.data.data.userInfo.loginName);
              _this.globalData.userInfo= res1.data.data.userInfo;

              wx.setStorageSync("openid",res1.data.data.openid);
              wx.setStorageSync("session_key",res1.data.data.session_key);
             
            }
          }
        })
      }
    }),
    // 获取系统信息
    wx.getSystemInfo({
      success: function (res) {
        // 获取可使用窗口宽度
        let clientHeight = res.windowHeight;
        // 获取可使用窗口高度
        let clientWidth = res.windowWidth;
        // 算出比例
        let ratio = 750 / clientWidth;
        console.log("ratio="+ratio);
        // 算出高度(单位rpx)
        let height = clientHeight * ratio;
        // 设置高度
        _this.globalData.height = height;
      }
    });
  },
  globalData: {
    userInfo: null,
    // theme: wx.getSystemInfoSync().theme,
    theme: 'white',
    baseUrl:'http://127.0.0.1:9080/',
    // baseUrl:'https://fw1.sucheng-group.com/',
    // baseUrl:'https://fw1.sucheng-group.com:8443/',
    height:null,
    shareTitle: '夙呈'
  }
})