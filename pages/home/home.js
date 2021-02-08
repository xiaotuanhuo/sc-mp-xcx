// 引用log.js日志文件
var log = require('../../utils/log.js') 
var util = require('../../utils/util.js') 
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
    background: ['/images/sc-0.jpg', '/images/sc-1.jpg', '/images/sc-2.jpg'],
    medias: [
      {
        mediaId: '4dklA23M01_Gj0_FC2oRugQJhHPSlan1F92_pi3uMg8',
        title: '麻醉科普｜除了手术室内麻醉，麻醉医生还有这些活要干',
        url: 'http://mp.weixin.qq.com/s?__biz=MzI1NDk2Mzk3NQ==&mid=100006087&idx=1&sn=ea891940c4ddd91844604fa6e6189a8b&chksm=6a3c60af5d4be9b95324a328d184e3dc74bcae0eaa74a3d601165d40b40c60dbe5a31025cdd1#rd',
        thumbUrl: 'http://mmbiz.qpic.cn/mmbiz_jpg/RtA9yPxAad5en0mlCfNr9nbHBojbZSbaA5icgRPTvZJmQpc2vs1FByDSib0zugNtYKxjtxucl934gQZq0S1LicTOg/0?wx_fmt=jpeg',
        updateTime: '2021-02-05 22:05:06'
      },
      {
        mediaId: '4dklA23M01_Gj0_FC2oRuqd56vP_sbAWKqc6pjywXkY',
        title: '“什么？女性更适合做麻醉医生吗？”',
        url: 'http://mp.weixin.qq.com/s?__biz=MzI1NDk2Mzk3NQ==&mid=100006050&idx=1&sn=888d614a5f39dbbd570b96d8d8a73ecf&chksm=6a3c60ca5d4be9dcc81cf08fbc9a8077395d6ffade2f7f40afd46ec1733ab7082649ebc3372c#rd',
        thumbUrl: 'http://mmbiz.qpic.cn/mmbiz_jpg/RtA9yPxAad57bVqADrt3Hc6Kd7GD2m3z0bd9OrHBs5vuGibcznZIibErTgSw9dmfic9DzZibZeaQ34bf8oibS2wY9YA/0?wx_fmt=jpeg',
        updateTime: '2021-02-03 14:34:28'
      },
      {
        mediaId: '4dklA23M01_Gj0_FC2oRuhjc0CglMI9vgJLVgZ7AK-g',
        title: '麻醉科普｜全麻醉手术后注意事项有哪些？',
        url: 'http://mp.weixin.qq.com/s?__biz=MzI1NDk2Mzk3NQ==&mid=100006040&idx=1&sn=e0fbdbf5c882032b8d89be0cf286d337&chksm=6a3c60f05d4be9e66f364662d7532511beaf656c1107e5534dd1e3aeaaf3959d279aa5e1bad4#rd',
        thumbUrl: 'http://mmbiz.qpic.cn/mmbiz_jpg/RtA9yPxAad4cdeC92YBRXo7ia3qBA5uqibEx6iasdnWAKjT9mfjribqIcPuuymHuHaIruJjMPziaQDjAHSAZvnKibydA/0?wx_fmt=jpeg',
        updateTime: '2021-01-30 13:04:06'
      },{
        mediaId: '4dklA23M01_Gj0_FC2oRuhVuA8QZVFbke7be0MnMFj0',
        title: '夜班遇上休克不会处理？先吃透这 5 点！',
        url: 'http://mp.weixin.qq.com/s?__biz=MzI1NDk2Mzk3NQ==&mid=100006023&idx=1&sn=d01a680026145b8f616fd6c7c138df8b&chksm=6a3c60ef5d4be9f948cf9adcaf0bd19aca4a2214758245ab8bceb04e71ceb943a9be751e1652#rd',
        thumbUrl: 'http://mmbiz.qpic.cn/mmbiz_jpg/RtA9yPxAad4cdeC92YBRXo7ia3qBA5uqibOxkdogTU6GYBdQlAlzOWYrQOEjtTrLYAemeC67YIKLeCFSRnhMs66Q/0?wx_fmt=jpeg',
        updateTime: '2021-01-29 18:26:18'
      }
    ]
  },
  onShow:function(){
    log.info("进入“公司简介”");
  },
  onLoad:function(){
    var _this = this;
    wx.request({
      url: app.globalData.baseUrl+'xcx/getGzhMedias',
      method: 'POST',
      data: {
        page: 1,
        limit: 4
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
  onHide:function(){
    log.info("离开“公司简介”")
  },
  moreMedia:function(){
    wx.navigateTo({
      url: '/pages/gzh-medias/gzh-medias'
    })
  },
  toMediaDetail:function(event){
    console.log(event.currentTarget.dataset.url);
    wx.navigateTo({
      url: '/pages/gzh-media-detail/gzh-media-detail?url='+encodeURIComponent(event.currentTarget.dataset.url)
    })
  }
})