// 引用log.js日志文件
var log = require('../../utils/log.js') 
//获取应用实例
const app = getApp()

Page({
  onShareAppMessage() {
    return {
      title: '凤呈',
      path: '/pages/home/home'
    }
  },
  data: {
    theme: app.globalData.theme,
    hadLogin: false,
    user: null
  },
  onShow: function(){
    log.info("进入“个人中心”");
    if(app.globalData.userInfo != null){
      this.setData({
        hadLogin: true,
        user: app.globalData.userInfo
      });
      if(wx.getStorageSync('anesthetics')==null || wx.getStorageSync('anesthetics') == ''){
        wx.request({
          url: app.globalData.baseUrl+'xcx/getAnestheticsAndOperatives',
          method: 'GET',
          data: {},
          header: {
            'content-type': 'application/json' // 默认值
          },
          dataType:'json',
          success (res) {
            console.log(res.data);
            if(res.data.code == 0){
              log.info("成功获取麻醉方法列表");
              wx.setStorageSync("anesthetics",res.data.data.anesthetics);
              // wx.setStorageSync("operatives",res.data.data.operatives);
            }else{
              log.info(res.data.msg);
              console.log(res.data.msg);
            }
          }
        })
      }else{
        // console.log("Storage anesthetics:"+wx.getStorageSync('anesthetics'));
      }
    }
  },
  onHide(){
    log.info("离开“个人中心”");
  },
  goLogin:function(){
    wx.navigateTo({
      url: '/pages/login/login'
    })
  },
  goSignOut:function(){
    wx.navigateTo({
      url: '/pages/sign-out/sign-out'
    })
  },
  myOrders:function(){
    wx.navigateTo({
      url: '/pages/order-list/order-list?flag=allOrder'
    })
  },
  myEvaluate:function(){
    wx.navigateTo({
      url: '/pages/order-list/order-list?flag=evaluateOrder'
    })
  },
  orderRelease:function(){
    if(app.globalData.userInfo == null){
      wx.showModal({
        title: '温馨提示',
        content: "请先登录",
        showCancel: false,
        confirmColor: '#06AE56',
        success (res) {
          if (res.confirm) {
            wx.navigateTo({url:"/pages/login/login"});
          }
        }
      })
    }else{
      wx.navigateTo({
        url: '/pages/order-release/order-release'
      })
    }
  }
})