//index.js
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
    grids: [
      {
          imgUrl: '/images/order-selected.png',
          url: '/pages/order-release/order-release',
          text: '订单发布'
      }
    ]
  },
  onShow: function(){
    if(app.globalData.userInfo != null){
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
            wx.setStorageSync("anesthetics",res.data.data.anesthetics);
            // wx.setStorageSync("operatives",res.data.data.operatives);
          }else{
            console.log(res.data.msg);
          }
        }
      })
    }else{
      wx.showModal({
        title: '温馨提示',
        content: "请先登录",
        showCancel: false,
        confirmColor: '#06AE56',
        success (res) {
          if (res.confirm) {
            wx.switchTab({url:"/pages/me/me"});
          }
        }
      })
    }
  },
  onLoad: function(options){
    
  }
})