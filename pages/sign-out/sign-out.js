// 引用log.js日志文件
var log = require('../../utils/log.js') 
//获取应用实例
const app = getApp()

Page({
  onShareAppMessage() {
    return {
      title: '夙呈',
      path: '/pages/home/home'
    }
  },
  data: {
    user:null
  },
  onLoad(){
    this.setData({
      user:app.globalData.userInfo
    });
  },
  onShow:function(){
    log.info("进入“登出”");
  },
  onHide:function(){
    log.info("离开“登出”");
  },
  signOut(){
    var that = this;
    wx.login({
      success(res) {
        if (res.code) {
          console.log(that);
          wx.request({
            url: app.globalData.baseUrl+'xcx/signOut',
            method: 'POST',
            data: {
              userId: that.data.user.userId
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            dataType:'json',
            success (res1) {
              console.log(res1.data);
              if(res1.data.code == 0){
                log.info("登出成功，loginName："+app.globalData.userInfo.loginName);
                app.globalData.userInfo= null;
                wx.removeStorageSync('openid');
                wx.removeStorageSync('session_key');
               
                wx.reLaunch({
                  url: '/pages/me/me'
                })
              }else{
                log.error(res1.data.msg);
                wx.showModal({
                  title: '温馨提示',
                  content: res1.data.msg,
                  showCancel: false,
                  confirmColor: '#06AE56'
                })
              }
            },
            fail({errMsg}) {
              log.error('调用调用登出接口失败，'+errMsg)
            }
          })
        }
      }
    })
  }

})