// 引用log.js日志文件
var log = require('../../utils/log.js') 
import * as echarts from '../../common/lib/ec-canvas/echarts';
//获取应用实例
const app = getApp();

var slInfo = [
  {name:'已完成',color:'#829BC6'},
  {name:'未完成',color:'#F8B84E'},
  {name:'取消',color:'#EF7765'}];
//今日手术量
var jrsslOption = {
  tooltip: {
      trigger: 'item',
      position: 'top',
      formatter: '{b} : {c} ({d}%)'
  },
  legend: {
      show: false,
  },
  series: [
    {
      name: '今日手术量',
      type: 'pie',
      label: false,
      radius: '75%',
      center: ['50%', '50%'],
      itemStyle: {
        color: function(params){
          if(params.name == slInfo[0].name){
            //已完成
            return slInfo[0].color;
          }else if(params.name == slInfo[1].name){
            //未完成
            return slInfo[1].color;
          }else if(params.name == slInfo[2].name){
            //取消
            return slInfo[2].color;
          }
        }
      },
      data: [
        {
          value: 0, 
          name: '已完成'
        },
        {
          value: 0, 
          name: '未完成'
        },
        {
          value: 0, 
          name: '取消'
        }
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
};

let jrsslChart = null;
function initJrsslChart(canvas, width, height, dpr) {
  jrsslChart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr
  });
  canvas.setChart(jrsslChart);
  jrsslChart.setOption(jrsslOption);
  return jrsslChart;
};

//月度手术量
var ydsslOption = {
  tooltip: {
      trigger: 'item',
      position: 'top',
      formatter: '{b} : {c} ({d}%)'
  },
  legend: {
    show: false,
  },
  series: [
    {
      name: '月度手术量',
      type: 'pie',
      label: false,
      radius: '75%',
      center: ['50%', '50%'],
      itemStyle: {
        color: function(params){
          if(params.name == slInfo[0].name){
            //已完成
            return slInfo[0].color;
          }else if(params.name == slInfo[1].name){
            //未完成
            return slInfo[1].color;
          }else if(params.name == slInfo[2].name){
            //取消
            return slInfo[2].color;
          }
        }
      },
      data: [
        {
          value: 0, 
          name: '已完成'
        },
        {
          value: 0, 
          name: '未完成'
        },
        {
          value: 0, 
          name: '取消'
        }
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
};

let ydsslChart = null;
function initYdsslChart(canvas, width, height, dpr) {
  ydsslChart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr
  });
  canvas.setChart(ydsslChart);
  ydsslChart.setOption(ydsslOption);
  return ydsslChart;
};

//周手术量
var weekOption = {
    color: ['#3398DB'],
    tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    grid: {
        left: 'center',
        top: 'middle',
        width: '95%',
        height: '70%',
        containLabel: false
    },
    xAxis: [
        {
            type: 'category',
            data: ['一', '二', '三', '四', '五', '六', '日'],
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
        }
    ],
    yAxis: [
        {
            show: false,
            type: 'value',
            minInterval: 1,
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            }
        }
    ],
    series: [
        {
            name: '周手术量',
            type: 'bar',
            barWidth: '50%',
            data: [
              ['一',0], 
              ['三',0], 
              ['二',0], 
              ['五',0], 
              ['四',0], 
              ['六',0], 
              ['日',0]],
            label: {
              show: true,
              position: "outside"
            }
        }
    ]
};

let weekChart = null;
function initWeekSslChart(canvas, width, height, dpr) {
  weekChart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr
  });
  canvas.setChart(weekChart);
  weekChart.setOption(weekOption);
  return weekChart;
};

//年手术量
var yearOption = {
  legend: {
    show: false
  },
  grid: {
    left: 'center',
    top: 'middle',
    width: '95%',
    height: '80%',
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
      formatter: '{value}'
    },
    splitLine: {
      lineStyle: {
        type: 'dashed'
      }
    }
  },
  series: [{
    name: '年手术量',
    type: 'line',
    itemStyle: {
      color: "#c257F6"
    }
  }],
  dataset: {
    dimensions: ['name','value'],
    source: [
      {name: '1月', value: 0},
      {name: '2月', value: 0},
      {name: '3月', value: 0},
      {name: '4月', value: 0},
      {name: '5月', value: 0},
      {name: '6月', value: 0},
      {name: '7月', value: 0},
      {name: '8月', value: 0},
      {name: '9月', value: 0},
      {name: '10月', value: 0},
      {name: '11月', value: 0},
      {name: '12月', value: 0},
    ]
  }
};

let yearChart = null;
function initYearSslChart(canvas, width, height, dpr) {
  yearChart = echarts.init(canvas, null, {
  width: width,
  height: height,
  devicePixelRatio: dpr
});
canvas.setChart(yearChart);
yearChart.setOption(yearOption);
return yearChart;
};

//月手术量
var monthOption = {
  legend: {
    show: false
  },
  grid: {
    left: 'center',
    top: 'middle',
    width: '95%',
    height: '80%',
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
      formatter: '{value}'
    },
    splitLine: {
      lineStyle: {
        type: 'dashed'
      }
    }
  },
  series: [{
    name: '月手术量',
    type: 'line',
    itemStyle: {
      color: "#c257F6"
    }
  }],
  dataset: {
    dimensions: ['name','value'],
    source: [
      {name: '1/1', value: 0},
      {name: '1/2', value: 0},
      {name: '1/3', value: 0},
      {name: '1/4', value: 0},
      {name: '1/5', value: 0},
      {name: '1/6', value: 0},
      {name: '1/7', value: 0},
      {name: '1/8', value: 0},
      {name: '1/9', value: 0},
      {name: '1/10', value: 0},
      {name: '1/11', value: 0},
      {name: '1/12', value: 0},
      {name: '1/13', value: 0},
      {name: '1/14', value: 0},
      {name: '1/15', value: 0},
      {name: '1/16', value: 0},
      {name: '1/17', value: 0},
      {name: '1/18', value: 0},
      {name: '1/19', value: 0},
      {name: '1/20', value: 0},
      {name: '1/21', value: 0},
      {name: '1/22', value: 0},
      {name: '1/23', value: 0},
      {name: '1/24', value: 0},
      {name: '1/25', value: 0},
      {name: '1/26', value: 0},
      {name: '1/27', value: 0},
      {name: '1/28', value: 0},
      {name: '1/29', value: 0},
      {name: '1/30', value: 0},
      {name: '1/31', value: 0}
    ]
  }
};

let monthChart = null;
function initMonthSslChart(canvas, width, height, dpr) {
  monthChart = echarts.init(canvas, null, {
  width: width,
  height: height,
  devicePixelRatio: dpr
});
canvas.setChart(monthChart);
monthChart.setOption(monthOption);
return monthChart;
};


Page({
  onShareAppMessage() {
    return {
      title: '夙呈',
      path: '/pages/home/home'
    }
  },
  data: {
    theme: app.globalData.theme,
    jrsslEc: {
      onInit: initJrsslChart
    },
    ydsslEc: {
      onInit: initYdsslChart
    },
    weekSslEc: {
      onInit: initWeekSslChart
    },
    yearSslEc: {
      onInit: initYearSslChart
    },
    monthSslEc: {
      onInit: initMonthSslChart
    },
    current: 'tab1',
    tab1: true,
    tab2: false,
    today: {
      completed: 0,
      notComplete: 0,
      cancel: 0
    },
    month: {
      completed: 0,
      notComplete: 0,
      cancel: 0
    },
    statisticsCurrent: 'statisticsTab1',
    statisticsTab1: true,
    statisticsTab2: false,
    statisticsTab3: false
  },
  handleChange ({ detail }) {
    var index = detail.key
    if(index == 'tab1'){
      this.setData({
        current: index,
        tab1:true,
        tab2: false
      })
    }else if(index == 'tab2'){
      this.setData({
        current: index,
        tab1: false,
        tab2:true
      })
    }
  },
  statisticsHandleChange({ detail }) {
    var index = detail.key
    if(index == 'statisticsTab1'){
      this.setData({
        statisticsCurrent: index,
        statisticsTab1: true,
        statisticsTab2: false,
        statisticsTab3: false
      })
    }else if(index == 'statisticsTab2'){
      this.setData({
        statisticsCurrent: index,
        statisticsTab1: false,
        statisticsTab2: true,
        statisticsTab3: false
      })
    }else if(index == 'statisticsTab3'){
      this.setData({
        statisticsCurrent: index,
        statisticsTab1: false,
        statisticsTab2: false,
        statisticsTab3: true
      })
    }
  },
  onShow: function(){
    log.info("进入“订单统计”");
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
        url: app.globalData.baseUrl+'xcx/getOrderStatistics',
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
            log.info("订单统计数据获取成功");
            setTimeout(function () {
              //今日手术量
              jrsslOption.series[0].data = res.data.data.todaySsl;
              jrsslChart.clear();
              jrsslChart.setOption(jrsslOption);
              var today_completed;
              var today_notComplete;
              var today_cancel;
              res.data.data.todaySsl.forEach(element => {
                if(element.name == slInfo[0].name){
                  today_completed = element.value;
                }else if(element.name == slInfo[1].name){
                  today_notComplete = element.value;
                }else if(element.name == slInfo[2].name){
                  today_cancel = element.value;
                }
              });
              _this.setData({
                today: {
                  completed: today_completed,
                  notComplete: today_notComplete,
                  cancel: today_cancel
                }
              });

              //月度手术量（切换后才会加载，所以不能setOption）
              ydsslOption.series[0].data = res.data.data.ydSsl;
              var yd_completed;
              var yd_notComplete;
              var yd_cancel;
              res.data.data.ydSsl.forEach(element => {
                if(element.name == slInfo[0].name){
                  yd_completed = element.value;
                }else if(element.name == slInfo[1].name){
                  yd_notComplete = element.value;
                }else if(element.name == slInfo[2].name){
                  yd_cancel = element.value;
                }
              });
              _this.setData({
                month: {
                  completed: yd_completed,
                  notComplete: yd_notComplete,
                  cancel: yd_cancel
                }
              });

              //周手术量
              weekOption.series[0].data = res.data.data.weekSsl;
              weekChart.clear();
              weekChart.setOption(weekOption);
              
              //月手术量
              monthOption.dataset.source = res.data.data.monthSsl;

              //年手术量
              yearOption.dataset.source = res.data.data.yearSsl;
            }, 1000);
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
          log.error('调用订单统计接口失败，'+errMsg)
        },
        complete(){
          wx.hideLoading();
        }
      })
    }
  },
  // onReady: function(){
  //   var _this = this;
  //   if(app.globalData.userInfo != null){
  //     wx.showLoading({
  //       title: '加载中...',
  //     });
  //     wx.request({
  //       url: app.globalData.baseUrl+'xcx/getOrderStatistics',
  //       method: 'GET',
  //       data: {
  //         orgId: app.globalData.userInfo.roleTypeId
  //       },
  //       header: {
  //         'content-type': 'application/json' // 默认值
  //       },
  //       dataType:'json',
  //       success (res) {
  //         console.log(res.data);
  //         if(res.data.code == 0){
  //           log.info("订单统计数据获取成功");
  //           //今日手术量
  //           jrsslOption.series[0].data = res.data.data.todaySsl;
  //           jrsslChart.clear();
  //           jrsslChart.setOption(jrsslOption);
  //           var today_completed;
  //           var today_notComplete;
  //           var today_cancel;
  //           res.data.data.todaySsl.forEach(element => {
  //             if(element.name == slInfo[0].name){
  //               today_completed = element.value;
  //             }else if(element.name == slInfo[1].name){
  //               today_notComplete = element.value;
  //             }else if(element.name == slInfo[2].name){
  //               today_cancel = element.value;
  //             }
  //           });
  //           _this.setData({
  //             today: {
  //               completed: today_completed,
  //               notComplete: today_notComplete,
  //               cancel: today_cancel
  //             }
  //           });

  //           //月度手术量（切换后才会加载，所以不能setOption）
  //           ydsslOption.series[0].data = res.data.data.ydSsl;
  //           var yd_completed;
  //           var yd_notComplete;
  //           var yd_cancel;
  //           res.data.data.ydSsl.forEach(element => {
  //             if(element.name == slInfo[0].name){
  //               yd_completed = element.value;
  //             }else if(element.name == slInfo[1].name){
  //               yd_notComplete = element.value;
  //             }else if(element.name == slInfo[2].name){
  //               yd_cancel = element.value;
  //             }
  //           });
  //           _this.setData({
  //             month: {
  //               completed: yd_completed,
  //               notComplete: yd_notComplete,
  //               cancel: yd_cancel
  //             }
  //           });

  //           //周手术量
  //           weekOption.series[0].data = res.data.data.weekSsl;
  //           weekChart.clear();
  //           weekChart.setOption(weekOption);
            
  //           //月手术量
  //           monthOption.dataset.source = res.data.data.monthSsl;

  //           //年手术量
  //           yearOption.dataset.source = res.data.data.yearSsl;

  //         }else{
  //           log.error(res.data.msg);
  //           wx.showModal({
  //             title: '温馨提示',
  //             content: res.data.msg,
  //             showCancel: false,
  //             confirmColor: '#06AE56'
  //           })
  //         }
  //       },
  //       fail({errMsg}) {
  //         log.error('调用订单统计接口失败，'+errMsg)
  //       },
  //       complete(){
  //         wx.hideLoading();
  //       }
  //     })
  //   }
  // },
  onHide:function(){
    log.info("离开“订单统计”");
  },
})