// 引用log.js日志文件
var log = require('../../utils/log.js') 
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
    user: {
      name: '',
      pws: ''
    },
    rules: [{
        name: 'name',
        rules: {required: true, message: '请输入用户名'},
      }, {
          name: 'pws',
          rules: {required: true, message: '请输入密码'},
      }
    ]
  },
  loginFormInputChange(e) {
    const {field} = e.currentTarget.dataset
    this.setData({
        [`user.${field}`]: e.detail.value
    });
  },
  onShow:function(){
    log.info("进入“登录”");
  },
  onHide:function(){
    log.info("离开“登录”");
  },
  submitForm() {
    this.selectComponent('#loginForm').validate((valid, errors) => {
      console.log('valid', valid, errors)
      if (!valid) {
          const firstError = Object.keys(errors)
          if (firstError.length) {
              this.setData({
                  error: errors[firstError[0]].message
              })
          }
      } else {
          var that = this;
          wx.login({
            success(res) {
              if (res.code) {
                console.log(that);
                wx.request({
                  url: app.globalData.baseUrl+'xcx/login',
                  method: 'POST',
                  data: {
                    name: that.data.user.name,
                    pws: that.data.user.pws,
                    code: res.code
                  },
                  header: {
                    'content-type': 'application/json' // 默认值
                  },
                  dataType:'json',
                  success (res1) {
                    console.log(res1.data);
                    if(res1.data.code == 0){
                      log.info("登录成功，loginName："+res1.data.data.userInfo.loginName);
                      app.globalData.userInfo= res1.data.data.userInfo;
                      console.log("userInfo:"+ app.globalData.userInfo);
                      wx.setStorageSync("openid",res1.data.data.openid);
                      wx.setStorageSync("session_key",res1.data.data.session_key);
                     
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
                    log.error('调用登录接口失败，'+errMsg)
                  }
                })
              }
            }
          })
      }
    })
  }
})