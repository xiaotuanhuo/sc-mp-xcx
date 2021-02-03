// 引用log.js日志文件
var log = require('../../utils/log.js') 
var util = require('../../utils/util.js') 
//获取应用实例
const app = getApp()
// pages/gzh-medias/gzh-medias.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    medias: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    wx.request({
      url: app.globalData.baseUrl+'xcx/getGzhMedias',
      method: 'POST',
      data: {
        page: 1,
        limit: 10
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      dataType:'json',
      success (res) {
        console.log(res.data);
        if(res.data.code == 0){
          log.info("成功获取公众号图文信息列表");
          _this.setData({
            medias: res.data.data
          });
        }else{
          log.info("获取公众号图文信息列表失败");
          console.log("获取公众号图文信息列表失败");
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  toMediaDetail:function(event){
    console.log(event.currentTarget.dataset.url);
    wx.navigateTo({
      url: '/pages/gzh-media-detail/gzh-media-detail?url='+encodeURIComponent(event.currentTarget.dataset.url)
    })
  }
})