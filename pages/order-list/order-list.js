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
  data:{
    theme: app.globalData.theme,
    isFilterPanelShow: false,
    filter: {
      patientName: '',
      operateUser: '',
      qaUser: '',
      startDate: '',
      endDate: '',
      orgId: ''
    },
    page: 1,
    limit:5,
    sumPage:1,
    show: false,
    orders:[
      // {
      //   documentId: '09rrhMgff6xCyxAs4OX',
      //   patientName: '张珊',
      //   operativeName: '下巴假体术',
      //   operateStartTime: '2020-11-20 10:04',
      //   documentState: '已完成'
      // }
    ],
  },

  onLoad(){
    if(app.globalData.userInfo != null){
      this.setData({
        filter: {
          patientName: '',
          operateUser: '',
          qaUser: '',
          startDate: '',
          endDate: '',
          orgId: app.globalData.userInfo.roleTypeId
        },
        show: true
      })
      var _this = this;
      wx.request({
        url: app.globalData.baseUrl+'xcx/searchOrderList',
        method: 'POST',
        data: {
          patientName: _this.data.filter.patientName,
          operateUser: _this.data.filter.operateUser,
          qaUser: _this.data.filter.qaUser,
          startDate: _this.data.filter.startDate,
          endDate: _this.data.filter.endDate,
          orgId: _this.data.filter.orgId,
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
            log.info("初次加载订单列表成功");
            var sumPage = Math.ceil(res.data.count/_this.data.limit);
            console.log("sum page:"+sumPage);
            _this.setData({
              orders : res.data.data,
              sumPage: sumPage
            });
          }else{
            log.error("初次获取订单列表时失败");
            wx.showModal({
              title: '温馨提示',
              content: '获取订单列表失败',
              showCancel: false,
              confirmColor: '#06AE56'
            })
          }
        },
        complete(){
          _this.setData({
            show: false
          });
        },
        fail({errMsg}) {
          log.error('调用获取订单列表接口失败，'+errMsg)
        }
      })
    }
  },
  onReachBottom: function () {
    var newPage = this.data.page+1;
    console.log("onReachBottom..........."+newPage);
    if(app.globalData.userInfo != null && newPage<=this.data.sumPage){
      var _this = this;
      _this.setData({
        show: true
      });
      wx.request({
        url: app.globalData.baseUrl+'xcx/searchOrderList',
        method: 'POST',
        data: {
          patientName: _this.data.filter.patientName,
          operateUser: _this.data.filter.operateUser,
          qaUser: _this.data.filter.qaUser,
          startDate: _this.data.filter.startDate,
          endDate: _this.data.filter.endDate,
          orgId: _this.data.filter.orgId,
          page: newPage,
          limit: _this.data.limit
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        dataType:'json',
        success (res) {
          console.log(res.data);
          if(res.data.code == 0){
            log.info("第"+newPage+"页订单列表获取成功");
            _this.setData({
              orders : _this.data.orders.concat(res.data.data),
              page : newPage
            });
          }else{
            log.error("加载订单列表失败");
            wx.showModal({
              title: '温馨提示',
              content: '加载失败',
              showCancel: false,
              confirmColor: '#06AE56'
            })
          }
        },
        fail({errMsg}) {
          log.error('调用加载订单列表接口失败，'+errMsg)
        },
        complete(){
          _this.setData({
            show: false
          });
        }
      })
    }
  },
  showFilterPanel: function () {
    this.setData({
      isFilterPanelShow: true
    })
  },
  hideFilterPanel: function () {
    this.setData({
      isFilterPanelShow: false
    })
  },
  isShowFilterPanelEvent: function() {
    if(this.data.isFilterPanelShow == true){
      this.hideFilterPanel();
    }else{
      this.showFilterPanel();
    }
  },
  filterFormInputChange(e) {
    const {field} = e.currentTarget.dataset
    this.setData({
        [`filter.${field}`]: e.detail.value
    });
  },
  submitForm() {
    this.hideFilterPanel();
    if(app.globalData.userInfo != null){
      wx.showLoading({
        title: '搜索中...',
        mask: true
      });
      var _this = this;
      wx.request({
        url: app.globalData.baseUrl+'xcx/searchOrderList',
        method: 'POST',
        data: {
          patientName: _this.data.filter.patientName,
          operateUser: _this.data.filter.operateUser,
          qaUser: _this.data.filter.qaUser,
          startDate: _this.data.filter.startDate,
          endDate: _this.data.filter.endDate,
          orgId: _this.data.filter.orgId,
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
            log.info("搜索订单列表成功");
            _this.setData({
              orders : res.data.data,
              page: 1
            });
          }else{
            log.error("搜索订单列表失败");
            wx.showModal({
              title: '温馨提示',
              content: '获取订单列表失败',
              showCancel: false,
              confirmColor: '#06AE56'
            })
          }
        },
        fail({errMsg}) {
          log.error('调用搜索订单列表接口失败，'+errMsg)
        },
        complete(){
          wx.hideLoading();
        }
      })
    }
  },
  onShow:function(){
    log.info("进入“订单列表”");
  },
  onHide:function(){
    log.info("离开“订单列表”");
  }
})