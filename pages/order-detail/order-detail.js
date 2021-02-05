// 引用log.js日志文件
var log = require('../../utils/log.js') 
//获取应用实例
const app = getApp()
Page({
  onShareAppMessage() {
    return {
      title: app.globalData.shareTitle,
      path: '/pages/home/home'
    }
  },
  data:{
    theme: app.globalData.theme,
    order:{
      
    }
  },
  onLoad: function (options) {
    console.log("documentId: "+options.documentId)
    var _this = this
    if (options.documentId){
      wx.request({
        method: 'GET',
        url: app.globalData.baseUrl+'xcx/getDocDetail',
        data: {
          documentId: options.documentId
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        dataType:'json',
        success: function (res) {
          console.log(res.data)
          if(0 == res.data.code){
            log.info("订单明细加载成功（订单号："+options.documentId+"）");
            _this.setData({
              order: res.data.data
            })
          }else{
            log.error(res.data.msg);
          }
        },
        fail({errMsg}) {
          log.error('调用获取订单详情接口失败，'+errMsg)
        }
      })
    }
  },
  onShow:function(){
    log.info("进入“订单详情”");
  },
  onHide:function(){
    log.info("离开“订单详情”");
  }
})