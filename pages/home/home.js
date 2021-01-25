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
    background: ['/images/sc.jpg', '/images/sc.jpg', '/images/sc.jpg'],
  },
  onShow:function(){
    log.info("进入“公司简介”");
  },
  onHide:function(){
    log.info("离开“公司简介”")
  }
})