// 引用log.js日志文件
var log = require('../../utils/log.js') 
var util = require('../../utils/util.js') 
//获取应用实例
const app = getApp()

Page({
  onShareAppMessage() {
    return {
      title: '夙呈',
      path: '/pages/home/home'
    }
  },
  data: {
    theme: app.globalData.theme,
    background: ['/images/sc-0.jpg', '/images/sc-1.jpg', '/images/sc-2.jpg'],
    medias: [
      // {
      //   mediaId: '4dklA23M01_Gj0_FC2oRug-099nl4RS_AmcyKQJC8n4',
      //   title: '元宵节｜城市虽空，万家灯火盼平安',
      //   thumbUrl: 'http://mmbiz.qpic.cn/mmbiz_jpg/RtA9yPxAad6r7bMdRah4zWicD5eAHV1vyoXIw3raD1WibVWs14fRbbvkwHknbUyXibP2eeAzHnTVQ23uPIuCjACKw/0?wx_fmt=jpeg',
      //   updateTime: '2020-02-08 19:17:06'
      // },
      // {
      //   mediaId: '4dklA23M01_Gj0_FC2oRug40J9dCdYZiTX58uRO2NVY',
      //   title: '“才不要给孩子打麻药呢！万一影响发育怎么办？！”',
      //   thumbUrl: 'http://mmbiz.qpic.cn/mmbiz_jpg/RtA9yPxAad7cbe2KOzTAyV9ExuTeCb9KMEgngJoibBkdfsaqD9ou0grdeufMdmLcWEQNeiciccWRXrVPAyw5A62yw/0?wx_fmt=jpeg',
      //   updateTime: '2018-04-27 22:56:22'
      // },
      // {
      //   mediaId: '4dklA23M01_Gj0_FC2oRug4TXSz0NawibKMHzzK44Tw',
      //   title: '围术期老年医学应成为老年麻醉学的努力方向围术期老年医学应成为老年麻醉学的努力方向围术期老年医学应成为老年麻醉学的努力方向',
      //   thumbUrl: 'http://mmbiz.qpic.cn/mmbiz_jpg/RtA9yPxAad4lc7n2LNNQp72WV6rXCYicMBS386GCjIHic8jT51wFHkRgvEQrONt6nK1xAgpsfeJxcpXMWEWv0dvA/0?wx_fmt=jpeg',
      //   updateTime: '2019-01-05 20:27:07'
      // },{
      //   mediaId: '4dklA23M01_Gj0_FC2oRug6RgLbNgQyTSRr8dRpOvh0',
      //   title: '舒适化口腔 | 为麻醉正名：麻醉不会影响记忆力！',
      //   thumbUrl: 'http://mmbiz.qpic.cn/mmbiz_jpg/RtA9yPxAad5dIbpEw5atBpltqorc6WS54U13h7DAZDLwGzDFYlfh9CaEYs9BKSXEJCp3hbgia3FjSkNv8UVIt1A/0?wx_fmt=jpeg',
      //   updateTime: '2020-09-18 15:44:49'
      // }
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