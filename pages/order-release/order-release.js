// 引用log.js日志文件
var log = require('../../utils/log.js') 
//index.js
var util=require("../../utils/util.js")
//获取应用实例
const app = getApp()

Page({
  onShareAppMessage() {
    return {
      title: app.globalData.shareTitle,
      path: '/pages/home/home'
    }
  },
  data: {
    theme: app.globalData.theme,
    patientSexs: ["女", "男"],
    anesthetics: wx.getStorageSync('anesthetics'),
    anestheticIndex:0,
    height: null,
    dialogShow: false,
    buttons: [{text: '确定',extClass: 'buttonStyle'}],
    operativeNames: [],
    value: '',
    selectedOperatives: [],
    order:{
      patientName: "",
      patientAge: "",
      operativeName: "",
      patientSex: 0,
      operateStartDate: util.formatDate(new Date()),
      operateStartTime: util.formatTime1(new Date()),
      patientNum: "",
      patientBednum: "",
      documentTitle: "",
      operateUser: "",
      operateUser2: "",
      operateQide: "",
      anestheticId: "",
      anestheticName: "",
      memo: ""
    },
  },
  onClear(e) {
    console.log('onClear', e)
    this.setData({
      operativeNames: [],
      value: ''
    })
  },
  onCancel(e) {
    console.log('onCancel', e)
    this.setData({
      operativeNames: [],
      value: ''
    })
  },
  onChange(e) {
    console.log('onChange: ', e.detail.value)
    var _this = this;
    wx.request({
      url: app.globalData.baseUrl+'xcx/searchOperativeNames',
      method: 'POST',
      data: {
        key: e.detail.value,
        orgId: app.globalData.userInfo.roleTypeId
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      dataType:'json',
      success (res) {
        console.log(res.data);
        if(res.data.code == 0){
          _this.setData({
            operativeNames : res.data.data
          })
        }else{
          log.error(res.data.msg);
          _this.setData({
            operativeNames : []
          })
        }
      }
    });
  },
  search: function (value) {
    return new Promise((resolve, reject) => {
      if(value.length > 0){
        wx.request({
          url: app.globalData.baseUrl+'xcx/searchOperativeNames',
          method: 'POST',
          data: {
            key: value,
            orgId: app.globalData.userInfo.roleTypeId
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          dataType:'json',
          success (res) {
            console.log(res.data);
            if(res.data.code == 0){
              resolve(res.data.data)
              // setTimeout(() => {
              //     resolve(res.data.data)
              // }, 200)
            }else{
              log.error(res.data.msg);
              resolve([])
            }
          }
        });
      }else{
        resolve([])
      }
    })
  },

  selectResult: function (e) {
      console.log('select result', e.currentTarget)
      var operatives = this.data.selectedOperatives;
      var flag = true;
      operatives.forEach(operative => {
        if(operative.value == e.currentTarget.dataset.value){
          flag = false;
        }
      });
      if(flag){
        operatives.push(e.currentTarget.dataset);
        this.setData({
          selectedOperatives: operatives
        });
      }

      // console.log('select result', e.detail)
      // var operatives = this.data.selectedOperatives;
      // var flag = true;
      // operatives.forEach(operative => {
      //   if(operative.value == e.detail.item.value){
      //     flag = false;
      //   }
      // });
      // if(flag){
      //   operatives.push(e.detail.item);
      //   this.setData({
      //     selectedOperatives: operatives
      //   });
      // }
  },

  searchOperativeName: function () {
    this.setData({
        dialogShow: true
    })
    var _this = this;
    wx.request({
      url: app.globalData.baseUrl+'xcx/searchOperativeNames',
      method: 'POST',
      data: {
        key: '',
        orgId: app.globalData.userInfo.roleTypeId
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      dataType:'json',
      success (res) {
        console.log(res.data);
        if(res.data.code == 0){
          _this.setData({
            operativeNames : res.data.data
          })
        }else{
          log.error(res.data.msg);
          _this.setData({
            operativeNames : []
          })
        }
      }
    });
  },
  deleteSelectedOperative: function(event){
    var index = event.currentTarget.dataset.index;
    var operatices = this.data.selectedOperatives;
    operatices.splice(index, 1);
    this.setData({
      selectedOperatives: operatices
    });
  },
  tapDialogButton(e) {
      this.setData({
          dialogShow: false
      })
  },

  formInputChange(e) {
    const {field} = e.currentTarget.dataset
    this.setData({
        [`order.${field}`]: e.detail.value
    });
  },
  bindSexChange: function(e) {
    console.log('picker sex 发生选择改变，携带值为', e.detail.value);

    this.setData({
      ['order.patientSex']: e.detail.value
    })
  },
  bindAnestheticChange: function(e) {
    console.log('picker AnestheticIndex 发生选择改变，携带值为', e.detail.value);
    console.log('picker AnestheticId 发生选择改变，携带值为',this.data.anesthetics[e.detail.value].anestheticId);

    this.setData({
      ['anestheticIndex']: e.detail.value,
    });
    this.setData({
      ['order.anestheticId']:this.data.anesthetics[e.detail.value].anestheticId,
      ['order.anestheticName']:this.data.anesthetics[e.detail.value].anestheticName
    })
  },

  onShow: function(){
    log.info("进入“订单发布”");
    this.setData({
      anesthetics: wx.getStorageSync('anesthetics')
    });
    console.log("anesthetics : ",this.data.anesthetics);
    this.data.order.anestheticId = this.data.anesthetics[0].anestheticId;
  },
  //初始化
  onLoad: function (options) {
    this.setData({
      search: this.search.bind(this)
    });

    // 设置高度
    this.setData({
      height: app.globalData.height
    });
    console.log("height : ",this.data.height);
  },
  onHide:function(){
    log.info("离开“订单发布”");
  },
  submitForm() {
    if(this.data.order.patientName == null || this.data.order.patientName == ''){
      this.setData({
        error: '患者姓名不能为空'
      })
      return;
    }
    if(this.data.order.patientAge == null || this.data.order.patientAge == ''){
      this.setData({
        error: '患者年龄不能为空'
      })
      return;
    }
    if(this.data.selectedOperatives.length == 0){
      this.setData({
        error: '手术名称不能为空'
      })
      return;
    }
    if(this.data.order.documentTitle == null || this.data.order.documentTitle == ''){
      this.setData({
        error: '诊断不能为空'
      })
      return;
    }
    wx.showLoading({
      title: '订单提交中...',
    });

    var operativeIds = '';
    for (let index = 0; index < this.data.selectedOperatives.length; index++) {
      if(index == 0){
        operativeIds = this.data.selectedOperatives[index].value;
      }else{
        operativeIds = operativeIds +','+ this.data.selectedOperatives[index].value;
      }
    }

    var operateUsers = '';
    if(this.data.order.operateUser.trim()!=''){
      operateUsers = this.data.order.operateUser.trim();
      if(this.data.order.operateUser2.trim()!=''){
        operateUsers = operateUsers+";"+this.data.order.operateUser2.trim();
      }
    }else{
      if(this.data.order.operateUser2.trim()!=''){
        operateUsers = this.data.order.operateUser2.trim();
      }
    }

    var _this = this;
    wx.request({
      url: app.globalData.baseUrl+'xcx/saveOrder',
      method: 'POST',
      data: {
        patientName: _this.data.order.patientName,
        patientAge: _this.data.order.patientAge,
        operativeId: operativeIds,
        patientSex: _this.data.order.patientSex,
        operateStartTime: _this.data.order.operateStartDate+" "+_this.data.order.operateStartTime+":00",
        patientNum: _this.data.order.patientNum,
        patientBednum: _this.data.order.patientBednum,
        documentTitle: _this.data.order.documentTitle,
        operateUser: operateUsers,
        operateQide: _this.data.order.operateQide,
        anestheticId: _this.data.order.anestheticId,
        anestheticName: _this.data.order.anestheticName,
        memo: _this.data.order.memo,
        orgId: app.globalData.userInfo.roleTypeId,
        applyUserId: app.globalData.userInfo.userId
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      dataType:'json',
      success (res) {
        console.log(res.data);
        if(res.data.code == 0){
          log.info(res.data.msg);
          wx.showModal({
            title: '温馨提示',
            content: res.data.msg,
            showCancel: false,
            confirmColor: '#06AE56',
            success (res) {
              if (res.confirm) {
                _this.setData({
                  anestheticIndex:0,
                  selectedOperatives:[],
                  order:{
                    patientName: "",
                    patientAge: "",
                    operativeId: "",
                    patientSex: 0,
                    operateStartDate: util.formatDate(new Date()),
                    operateStartTime: util.formatTime1(new Date()),
                    patientNum: "",
                    patientBednum: "",
                    documentTitle: "",
                    operateUser: "",
                    operateUser2: "",
                    operateQide: "",
                    anestheticId: _this.data.anesthetics[0].anestheticId,
                    anestheticName: "",
                    memo: ""
                  }
                });
              }
            }
          })
        }else{
          log.error(res.data.msg);
          wx.showModal({
            title: '温馨提示',
            content: res.data.msg,
            showCancel: false,
            confirmColor: '#06AE56'
          })
        }
      },
      fail({errMsg}) {
        log.error('调用订单发布接口失败，'+errMsg)
      },
      complete(){
        wx.hideLoading();
      }
    })
    // for(var k in this.data.order){
    //   console.log(k+" : "+this.data.order[k]);
    // }
  }
})