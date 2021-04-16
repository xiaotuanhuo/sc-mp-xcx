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
    current: 'tab1',
    tab1: true, //所有订单
    tab2: false, //待评价订单
    isFilterPanelShow: false,
    filter: {
      patientName: '',
      operateUser: '',
      qaUser: '',
      startDate: '',
      endDate: '',
      orgId: '',
    },
    show: false,
    limit: 5,
    allOrder: {
      page: 1,
      sumPage: 1,
      orders:[],
    },
    evaluateOrder: {
      page: 1,
      sumPage: 1,
      orders:[
      ],
    }
  },
  handleChange ({ detail }) {
    var index = detail.key
    if(index == 'tab1'){
      this.setData({
        current: index,
        tab1:true,
        tab2: false
      });
    }else if(index == 'tab2'){
      this.setData({
        current: index,
        tab1: false,
        tab2:true
      })
    }

    if(app.globalData.userInfo != null){
      this.setData({
        filter: {
          patientName: '',
          operateUser: '',
          qaUser: '',
          startDate: '',
          endDate: '',
          orgId: app.globalData.userInfo.roleTypeId,
        },
        show: true,
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
          limit: _this.data.limit,
          flag: _this.data.tab1?'allOrder':'evaluateOrder'
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        dataType:'json',
        success (res) {
          console.log(res.data);
          if(res.data.code == 0){
            log.info("切换订单种类，加载订单列表成功");
            var sumPage = Math.ceil(res.data.count/_this.data.limit);
            console.log("sum page:"+sumPage);
            if(_this.data.tab1){
              _this.setData({
                allOrder: {
                  page: 1,
                  sumPage: sumPage,
                  orders: res.data.data
                }
              });
            }else{
              _this.setData({
                evaluateOrder: {
                  page: 1,
                  sumPage: sumPage,
                  orders: res.data.data
                }
              });
            }
          }else{
            log.error("切换订单种类，获取订单列表时失败");
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
  onLoad(params){
    if('allOrder' == params.flag){
      this.setData({
        current: 'tab1',
        tab1:true,
        tab2: false
      });
    }else{
      this.setData({
        current: 'tab2',
        tab1: false,
        tab2: true
      });
    }
    if(app.globalData.userInfo != null){
      this.setData({
        filter: {
          patientName: '',
          operateUser: '',
          qaUser: '',
          startDate: '',
          endDate: '',
          orgId: app.globalData.userInfo.roleTypeId,
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
          limit: _this.data.limit,
          flag: _this.data.tab1?'allOrder':'evaluateOrder'
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
            if(_this.data.tab1){
              _this.setData({
                allOrder: {
                  page: 1,
                  sumPage: sumPage,
                  orders: res.data.data
                }
              });
            }else{
              _this.setData({
                evaluateOrder: {
                  page: 1,
                  sumPage: sumPage,
                  orders: res.data.data
                }
              });
            }
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
    var newPage;
    var sumPage;
    if(this.data.tab1){
      newPage = this.data.allOrder.page+1;
      sumPage = this.data.allOrder.sumPage;
    }else{
      newPage = this.data.evaluateOrder.page+1;
      sumPage = this.data.evaluateOrder.sumPage;
    }
    console.log("onReachBottom..........."+newPage);
    if(app.globalData.userInfo != null && newPage<=sumPage){
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
          limit: _this.data.limit,
          flag: _this.data.tab1?'allOrder':'evaluateOrder'
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        dataType:'json',
        success (res) {
          console.log(res.data);
          if(res.data.code == 0){
            log.info("第"+newPage+"页订单列表获取成功");
            if(_this.data.tab1){
              _this.setData({
                allOrder: {
                  page: newPage,
                  sumPage: sumPage,
                  orders: _this.data.allOrder.orders.concat(res.data.data)
                }
              });
            }else{
              _this.setData({
                evaluateOrder: {
                  page: newPage,
                  sumPage: sumPage,
                  orders: _this.data.evaluateOrder.orders.concat(res.data.data)
                }
              });
            }
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
          limit: _this.data.limit,
          flag: _this.data.tab1?'allOrder':'evaluateOrder'
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        dataType:'json',
        success (res) {
          console.log(res.data);
          if(res.data.code == 0){
            log.info("搜索订单列表成功");
            var sumPage = Math.ceil(res.data.count/_this.data.limit);
            if(_this.data.tab1){
              _this.setData({
                allOrder: {
                  page: 1,
                  sumPage: sumPage,
                  orders: res.data.data
                }
              });
            }else{
              _this.setData({
                evaluateOrder: {
                  page: 1,
                  sumPage: sumPage,
                  orders: res.data.data
                }
              });
            }
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
  },
  evaluate:function(event){
    console.log("评价。。。。。。。。。。。。。。");
    wx.navigateTo({
      url: '/pages/evaluate/evaluate?documentId='+event.currentTarget.dataset.id
    })
  },
  toOrderDetail:function(event){
    console.log("明细。。。。。。。。。。。。。。");
    wx.navigateTo({
      url: '/pages/order-detail/order-detail?documentId='+event.currentTarget.dataset.id
    })
  }
})