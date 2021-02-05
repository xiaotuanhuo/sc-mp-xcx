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
    isDisabled: false,
    documentId:'',
    evaluateStar: 5,
    evaluateText:''
  },

  evaluateTextChange(e) {
    this.setData({
      evaluateText: e.detail.value
    });
    console.log("evaluateText:"+e.detail.value)
  },
  onChange(e) {
      this.setData({
        evaluateStar: e.detail.value,
      })
      console.log("change:"+e.detail.value)
  },
  onLoad(options){
    this.setData({
      documentId : options.documentId
    })
    console.log("documentId1:"+this.data.documentId);

    var _this = this;
    wx.request({
      url: app.globalData.baseUrl+'xcx/getDocDetail',
      method: 'GET',
      data: {
        documentId: _this.data.documentId
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      dataType:'json',
      success (res) {
        console.log(res.data);
        if(res.data.code == 0){
          if(res.data.data.hospitalEvaluate != -1){
            _this.setData({
              isDisabled: true,
              evaluateStar: res.data.data.hospitalEvaluate,
              evaluateText: res.data.data.hospitalEvaluateMemo
            });
          }else{
            _this.setData({
              isDisabled: false,
              evaluateStar: res.data.data.hospitalEvaluate,
              evaluateText: res.data.data.hospitalEvaluateMemo
            });
          }
          
          log.info("首次加载订单（"+_this.data.documentId+"）评价信息");
        }else{
          log.error("获取订单（"+_this.data.documentId+"）评价信息失败");
        }
      },
      fail({errMsg}) {
        log.error('调用获取评价信息接口失败，'+errMsg)
      }
    })
  },
  onShow:function(){
    log.info("进入“评价”");
  },
  onHide:function(){
    log.info("离开“评价”");
  },
  evaluateSubmit(){
    wx.showLoading({
      title: '提交中...',
    });
    var _this = this;
    wx.request({
      url: app.globalData.baseUrl+'xcx/orderEvaluate',
      method: 'POST',
      data: _this.data,
      header: {
        'content-type': 'application/json' // 默认值
      },
      dataType:'json',
      success (res) {
        console.log(res.data);
        if(res.data.code == 0){
          log.info("订单评价成功（"+_this.data.documentId+"）");
          wx.showModal({
            title: '温馨提示',
            content: res.data.msg,
            showCancel: false,
            confirmColor: '#06AE56'
          })
        }else{
          log.error(res.data.msg)
          wx.showModal({
            title: '温馨提示',
            content: res.data.msg,
            showCancel: false,
            confirmColor: '#06AE56'
          })
        }
      },
      fail({errMsg}) {
        log.error('调用评价接口失败，'+errMsg)
      },
      complete(){
        wx.hideLoading();
      }
    })
  }
})