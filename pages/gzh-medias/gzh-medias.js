// 引用log.js日志文件
var log = require('../../utils/log.js') 
var util = require('../../utils/util.js') 
//获取应用实例
const app = getApp()
Page({
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
    return {
      title: app.globalData.shareTitle,
      path: '/pages/home/home'
    }
  },
  /**
   * 页面的初始数据
   */
  data: {
    limit: 10,
    page: 1,
    sumPage: 1,
    medias: [],
    show: false,
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
        limit: _this.data.limit
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      dataType:'json',
      success (res) {
        console.log(res.data);
        if(res.data.code == 0){
          log.info("成功获取公众号图文信息列表");
          var sumPage = Math.ceil(res.data.count/_this.data.limit);
          _this.setData({
            page: 1,
            sumPage: sumPage,
            medias: res.data.data
          });
        }else{
          log.error("获取公众号图文信息列表失败");
          console.log("获取公众号图文信息列表失败");
        }
      },
      complete(){
        _this.setData({
          show: false
        });
      },
      fail({errMsg}) {
        log.error('调用获取公众号图文信息列表接口失败，'+errMsg)
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
    log.info("进入“热点关注”");
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    log.info("离开“热点关注”");
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
    var _this = this;
    var newPage = _this.data.page+1;
    console.log("onReachBottom..........."+newPage);
    if(newPage <= _this.data.sumPage){
      _this.setData({
        show: true
      });
      wx.request({
        url: app.globalData.baseUrl+'xcx/getGzhMedias',
        method: 'POST',
        data: {
          page: newPage,
          limit: _this.data.limit,
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        dataType:'json',
        success (res) {
          console.log(res.data);
          if(res.data.code == 0){
            log.info("第"+newPage+"页公众号图文信息列表获取成功");
            _this.setData({
              page: newPage,
              medias: _this.data.medias.concat(res.data.data)
            });
          }else{
            log.error("公众号图文信息列表失败");
            console.log("获取公众号图文信息列表失败");
          }
        },
        fail({errMsg}) {
          log.error('调用加载公众号图文信息列表接口失败，'+errMsg)
        },
        complete(){
          _this.setData({
            show: false
          });
        }
      })
    }
  },

  toMediaDetail:function(event){
    console.log(event.currentTarget.dataset.url);
    wx.navigateTo({
      url: '/pages/gzh-media-detail/gzh-media-detail?url='+encodeURIComponent(event.currentTarget.dataset.url)
    })
  }
})