// 引用log.js日志文件
var log = require('../../utils/log.js') 
import * as echarts from '../../common/lib/ec-canvas/echarts';

var option = {
  title: {
    text: '前7天手术量',
    left: 'left',
    padding:10,
    textStyle: {
      color: "#07c160",
      fontSize: 15
    }
  },
  legend: {
    show: false
  },
  grid: {
    left: '1%',
    right: '3%',
    top: '18%',
    bottom: '1%',
    containLabel: true
  },
  tooltip: {
    show: true,
    trigger: 'axis'
  },
  xAxis: {
    type: 'category',
    axisTick: {
      show: false
    },
    boundaryGap: true
  },
  yAxis: {
    type: 'value',
    minInterval: 1,
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      show: true,
      inside: false,
      margin: 4,
      formatter: '{value}台'
    },
    splitLine: {
      lineStyle: {
        type: 'dashed'
      }
    }
  },
  series: [{
    name: '手术量',
    type: 'line',
    itemStyle: {
      color: "#c257F6"
    }
  }],
  dataset: {
    dimensions: ['date','count'],
    // source: []
    source: [
      {date: '12月11号', count: 3},
      {date: '12月12号', count: 5},
      {date: '12月13号', count: 10},
      {date: '12月14号', count: 7},
      {date: '12月15号', count: 20},
      {date: '12月16号', count: 12},
      {date: '12月17号', count: 9}
    ]
  }
};
let chart = null;
function initChart(canvas, width, height, dpr) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr
  });
  canvas.setChart(chart);
  chart.setOption(option);
  return chart;
}

//获取应用实例
const app = getApp()

Page({
  onShareAppMessage() {
    return {
      title: '凤呈',
      path: '/pages/home/home'
    }
  },
  data: {
    theme: app.globalData.theme,
    ec: {
      onInit: initChart
    },
    curDayCount: 0,
    curWeekCount: 0,
    curMonthCount: 0,
    averageDuration: 0
  },
  onShow: function(){
    log.info("进入“当前详情”");
    if(app.globalData.userInfo == null){
      wx.showModal({
        title: '温馨提示',
        content: "请先登录",
        showCancel: false,
        confirmColor: '#06AE56',
        success (res) {
          if (res.confirm) {
            wx.switchTab({url:"/pages/me/me"});
          }
        }
      })
    }else{
      var _this = this;
      wx.showLoading({
        title: '加载中...',
      });
      wx.request({
        url: app.globalData.baseUrl+'xcx/getOperativeCount',
        method: 'GET',
        data: {
          orgId: app.globalData.userInfo.roleTypeId
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        dataType:'json',
        success (res) {
          console.log(res.data);
          if(res.data.code == 0){
            log.info("当前开票量数据获取成功");
            _this.setData({
              curDayCount: res.data.data.curDayCount,
              curWeekCount: res.data.data.curWeekCount,
              curMonthCount: res.data.data.curMonthCount,
              averageDuration: res.data.data.averageDuration
            });
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
          log.error('调用获取当前手术量详情接口失败，'+errMsg)
        },
        complete(){
          wx.hideLoading();
        }
      })
    }
  },
  onReady: function(){
    var _this = this;
    if(app.globalData.userInfo != null){
      wx.showLoading({
        title: '加载中...',
      });
      wx.request({
        url: app.globalData.baseUrl+'xcx/getBeforeSevenOperativeCount',
        method: 'GET',
        data: {
          orgId: app.globalData.userInfo.roleTypeId
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        dataType:'json',
        success (res) {
          console.log(res.data);
          if(res.data.code == 0){
            log.info("前七天手术量数据获取成功");
            option.dataset.source = res.data.data;
            chart.setOption(option);
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
          log.error('调用获取前七天手术量详情接口失败，'+errMsg)
        },
        complete(){
          wx.hideLoading();
        }
      })
    }
  },
  onHide:function(){
    log.info("离开“当前详情”");
  }
})