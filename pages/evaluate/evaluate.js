// 引用log.js日志文件
var log = require('../../utils/log.js') 
//获取应用实例
const app = getApp()

const evaluateText = ['差','一般','满意'];
const evaluateColor = ['#B5B5B5','#FFAE00'];

var evaluateLabels = [[{"labelId":"11","labelName":"服务态度好","parentId":"1","labelLevel":"1","leaf":"1"},{"labelId":"21","labelName":"配合度高","parentId":"2","labelLevel":"1","leaf":"1"},{"labelId":"31","labelName":"术前评估及时","parentId":"3","labelLevel":"1","leaf":"1"},{"labelId":"41","labelName":"术中管理平稳","parentId":"4","labelLevel":"1","leaf":"1"},{"labelId":"51","labelName":"术后无并发症","parentId":"5","labelLevel":"1","leaf":"1"},{"labelId":"61","labelName":"术后无疼痛","parentId":"6","labelLevel":"1","leaf":"1"}],[{"labelId":"12","labelName":"服务态度一般","parentId":"1","labelLevel":"2","leaf":"1"},{"labelId":"22","labelName":"配合度一般","parentId":"2","labelLevel":"2","leaf":"1"},{"labelId":"32","labelName":"术前评估有遗漏","parentId":"3","labelLevel":"2","leaf":"1"},{"labelId":"42","labelName":"术中管理欠妥","parentId":"4","labelLevel":"2","leaf":"1"},{"labelId":"52","labelName":"术后并发症少","parentId":"5","labelLevel":"2","leaf":"1"},{"labelId":"62","labelName":"术后疼痛能忍受","parentId":"6","labelLevel":"2","leaf":"1"}],[{"labelId":"13","labelName":"服务态度差","parentId":"1","labelLevel":"3","leaf":"1"},{"labelId":"23","labelName":"配合度较差","parentId":"2","labelLevel":"3","leaf":"1"},{"labelId":"33","labelName":"术前评估不及时","parentId":"3","labelLevel":"3","leaf":"1"},{"labelId":"43","labelName":"术中管理较差","parentId":"4","labelLevel":"3","leaf":"1"},{"labelId":"53","labelName":"术后并发症较多","parentId":"5","labelLevel":"3","leaf":"1"},{"labelId":"63","labelName":"术后疼痛剧烈","parentId":"6","labelLevel":"3","leaf":"1"}]];

Page({
  onShareAppMessage() {
    return {
      title: app.globalData.shareTitle,
      path: '/pages/home/home'
    }
  },
  data:{
    theme: app.globalData.theme,
    showLabel: true,
    labels: [],
    documentId:'',
    evaluateScoreText:evaluateText[2],
    evaluateScore: 4,
    evaluateRemark: '',
    fftd: {
      text: evaluateLabels[0][0].labelName,
      value: '0',
      color: evaluateColor[0]
    },
    phd: {
      text: evaluateLabels[0][1].labelName,
      value: '0',
      color: evaluateColor[0]
    },
    sqpg: {
      text: evaluateLabels[0][2].labelName,
      value: '0',
      color: evaluateColor[0]
    },
    szgl: {
      text: evaluateLabels[0][3].labelName,
      value: '0',
      color: evaluateColor[0]
    },
    shbfz: {
      text: evaluateLabels[0][4].labelName,
      value: '0',
      color: evaluateColor[0]
    },
    shtt: {
      text: evaluateLabels[0][5].labelName,
      value: '0',
      color: evaluateColor[0]
    },
  },

  evaluateTextChange(e) {
    this.setData({
      evaluateRemark: e.detail.value
    });
    console.log("evaluateRemark:"+e.detail.value)
  },
  onChange(e) {
      console.log("change:"+e.detail.value)

      var score = e.detail.value;
      if(score < 2){
        this.setData({
          evaluateScore: score,
          evaluateScoreText: evaluateText[0],
          fftd: {
            text: evaluateLabels[2][0].labelName,
            value: '0',
            color: evaluateColor[0]
          },
          phd: {
            text: evaluateLabels[2][1].labelName,
            value: '0',
            color: evaluateColor[0]
          },
          sqpg: {
            text: evaluateLabels[2][2].labelName,
            value: '0',
            color: evaluateColor[0]
          },
          szgl: {
            text: evaluateLabels[2][3].labelName,
            value: '0',
            color: evaluateColor[0]
          },
          shbfz: {
            text: evaluateLabels[2][4].labelName,
            value: '0',
            color: evaluateColor[0]
          },
          shtt: {
            text: evaluateLabels[2][5].labelName,
            value: '0',
            color: evaluateColor[0]
          },
        })
      }else if(score >= 2 && score <4){
        this.setData({
          evaluateScore: score,
          evaluateScoreText: evaluateText[1],
          fftd: {
            text: evaluateLabels[1][0].labelName,
            value: '0',
            color: evaluateColor[0]
          },
          phd: {
            text: evaluateLabels[1][1].labelName,
            value: '0',
            color: evaluateColor[0]
          },
          sqpg: {
            text: evaluateLabels[1][2].labelName,
            value: '0',
            color: evaluateColor[0]
          },
          szgl: {
            text: evaluateLabels[1][3].labelName,
            value: '0',
            color: evaluateColor[0]
          },
          shbfz: {
            text: evaluateLabels[1][4].labelName,
            value: '0',
            color: evaluateColor[0]
          },
          shtt: {
            text: evaluateLabels[1][5].labelName,
            value: '0',
            color: evaluateColor[0]
          },
        })
      }else {
        this.setData({
          evaluateScore: score,
          evaluateScoreText: evaluateText[2],
          fftd: {
            text: evaluateLabels[0][0].labelName,
            value: '0',
            color: evaluateColor[0]
          },
          phd: {
            text: evaluateLabels[0][1].labelName,
            value: '0',
            color: evaluateColor[0]
          },
          sqpg: {
            text: evaluateLabels[0][2].labelName,
            value: '0',
            color: evaluateColor[0]
          },
          szgl: {
            text: evaluateLabels[0][3].labelName,
            value: '0',
            color: evaluateColor[0]
          },
          shbfz: {
            text: evaluateLabels[0][4].labelName,
            value: '0',
            color: evaluateColor[0]
          },
          shtt: {
            text: evaluateLabels[0][5].labelName,
            value: '0',
            color: evaluateColor[0]
          },
        })
      }
  },
  onLoad(options){
    this.setData({
      documentId : options.documentId
    })
    console.log("documentId1:"+this.data.documentId);

    var _this = this;
    wx.request({
      url: app.globalData.baseUrl+'xcx/getEvaluateLabels',
      method: 'GET',
      data: {
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      dataType:'json',
      success (res) {
        console.log(res.data);
        if(res.data.code == 0){
          evaluateLabels = res.data.data;
          
          log.info("加载评价标签信息");
        }else{
          log.error("获取评价标签信息失败");
        }
      },
      fail({errMsg}) {
        log.error('调用获取评价标签接口失败，'+errMsg)
      }
    });

    wx.request({
      url: app.globalData.baseUrl+'xcx/getEvaluate',
      method: 'GET',
      data: {
        documentId: _this.data.documentId
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      dataType:'json',
      success (res) {
        console.log(res.data);
        if(res.data.code == 0){
          if(res.data.data != null){
            var text = '';
            if(res.data.data.score < 2){
              text = evaluateText[0];
            }else if(res.data.data.score >=2 && res.data.data.score < 4){
              text = evaluateText[1];
            }else{
              text = evaluateText[2];
            }
            _this.setData({
              evaluateScoreText:text,
              evaluateScore: res.data.data.score,
              evaluateRemark: res.data.data.remark,
              showLabel: false,
              labels: res.data.data.labels
            });
          }
          
          log.info("首次加载订单（"+_this.data.documentId+"）评价信息");
        }else{
          log.error("获取订单（"+_this.data.documentId+"）评价信息失败");
        }
      },
      fail({errMsg}) {
        log.error('调用获取评价信息接口失败，'+errMsg)
      }
    })
  },
  onShow:function(){
    log.info("进入“评价”");
  },
  onHide:function(){
    log.info("离开“评价”");
  },
  evaluateSubmit(){
    wx.showLoading({
      title: '提交中...',
    });
    var _this = this;
    var labelId = (_this.data.fftd.value == '0'?'':_this.data.fftd.value+',')
    + (_this.data.phd.value == '0'?'':_this.data.phd.value+',')
    + (_this.data.sqpg.value == '0'?'':_this.data.sqpg.value+',')
    + (_this.data.szgl.value == '0'?'':_this.data.szgl.value+',')
    + (_this.data.shbfz.value == '0'?'':_this.data.shbfz.value+',')
    + (_this.data.shtt.value == '0'?'':_this.data.shtt.value+',');

    console.log("labelId : "+labelId.substr(0, labelId.length-1));
    
    wx.request({
      url: app.globalData.baseUrl+'xcx/orderEvaluate',
      method: 'POST',
      data: {
        documentId: _this.data.documentId,
        score: _this.data.evaluateScore,
        remark: _this.data.evaluateRemark,
        labelId: labelId.substr(0, labelId.length-1),
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      dataType:'json',
      success (res) {
        console.log(res.data);
        if(res.data.code == 0){
          log.info("订单评价成功（"+_this.data.documentId+"）");
          _this.setData({
            labels: res.data.data.labels,
            showLabel: false
          });
          wx.showModal({
            title: '温馨提示',
            content: "评价成功，谢谢！",
            showCancel: false,
            confirmColor: '#06AE56'
          })
        }else{
          log.error(res.data.msg)
          wx.showModal({
            title: '温馨提示',
            content: res.data.msg,
            showCancel: false,
            confirmColor: '#06AE56'
          })
        }
      },
      fail({errMsg}) {
        log.error('调用评价接口失败，'+errMsg)
      },
      complete(){
        wx.hideLoading();
      }
    })
  },
  fftdSelect:function(){
    if(this.data.fftd.value == '0'){
      if(this.data.evaluateScore < 2){
        this.setData({
          fftd: {
            value: evaluateLabels[2][0].labelId,
            text: this.data.fftd.text,
            color: evaluateColor[1]
          }
        })
      }else if(this.data.evaluateScore >=2 && this.data.evaluateScore < 4){
        this.setData({
          fftd: {
            value: evaluateLabels[1][0].labelId,
            text: this.data.fftd.text,
            color: evaluateColor[1]
          }
        })
      }else {
        this.setData({
          fftd: {
            value: evaluateLabels[0][0].labelId,
            text: this.data.fftd.text,
            color: evaluateColor[1]
          }
        })
      }
    }else{
      this.setData({
        fftd: {
          value: '0',
          text: this.data.fftd.text,
          color: evaluateColor[0]
        }
      })
    }
    console.log(this.data.fftd.value);
  },
  phdSelect:function(){
    if(this.data.phd.value == '0'){
      if(this.data.evaluateScore < 2){
        this.setData({
          phd: {
            value: evaluateLabels[2][1].labelId,
            text: this.data.phd.text,
            color: evaluateColor[1]
          }
        })
      }else if(this.data.evaluateScore >=2 && this.data.evaluateScore < 4){
        this.setData({
          phd: {
            value: evaluateLabels[1][1].labelId,
            text: this.data.phd.text,
            color: evaluateColor[1]
          }
        })
      }else {
        this.setData({
          phd: {
            value: evaluateLabels[0][1].labelId,
            text: this.data.phd.text,
            color: evaluateColor[1]
          }
        })
      }
    }else{
      this.setData({
        phd: {
          value: '0',
          text: this.data.phd.text,
          color: evaluateColor[0]
        }
      })
    }
  },
  sqpgSelect:function(){
    if(this.data.sqpg.value == '0'){
      if(this.data.evaluateScore < 2){
        this.setData({
          sqpg: {
            value: evaluateLabels[2][2].labelId,
            text: this.data.sqpg.text,
            color: evaluateColor[1]
          }
        })
      }else if(this.data.evaluateScore >=2 && this.data.evaluateScore < 4){
        this.setData({
          sqpg: {
            value: evaluateLabels[1][2].labelId,
            text: this.data.sqpg.text,
            color: evaluateColor[1]
          }
        })
      }else {
        this.setData({
          sqpg: {
            value: evaluateLabels[2][2].labelId,
            text: this.data.sqpg.text,
            color: evaluateColor[1]
          }
        })
      }
    }else{
      this.setData({
        sqpg: {
          value: '0',
          text: this.data.sqpg.text,
          color: evaluateColor[0]
        }
      })
    }
  },
  szglSelect:function(){
    if(this.data.szgl.value == '0'){
      if(this.data.evaluateScore < 2){
        this.setData({
          szgl: {
            value: evaluateLabels[2][3].labelId,
            text: this.data.szgl.text,
            color: evaluateColor[1]
          }
        })
      }else if(this.data.evaluateScore >=2 && this.data.evaluateScore < 4){
        this.setData({
          szgl: {
            value: evaluateLabels[1][3].labelId,
            text: this.data.szgl.text,
            color: evaluateColor[1]
          }
        })
      }else {
        this.setData({
          szgl: {
            value: evaluateLabels[0][3].labelId,
            text: this.data.szgl.text,
            color: evaluateColor[1]
          }
        })
      }
    }else{
      this.setData({
        szgl: {
          value: '0',
          text: this.data.szgl.text,
          color: evaluateColor[0]
        }
      })
    }
  },
  shbfzSelect:function(){
    if(this.data.shbfz.value == '0'){
      if(this.data.evaluateScore < 2){
        this.setData({
          shbfz: {
            value: evaluateLabels[2][4].labelId,
            text: this.data.shbfz.text,
            color: evaluateColor[1]
          }
        })
      }else if(this.data.evaluateScore >=2 && this.data.evaluateScore < 4){
        this.setData({
          shbfz: {
            value: evaluateLabels[1][4].labelId,
            text: this.data.shbfz.text,
            color: evaluateColor[1]
          }
        })
      }else {
        this.setData({
          shbfz: {
            value: evaluateLabels[0][4].labelId,
            text: this.data.shbfz.text,
            color: evaluateColor[1]
          }
        })
      }
    }else{
      this.setData({
        shbfz: {
          value: '0',
          text: this.data.shbfz.text,
          color: evaluateColor[0]
        }
      })
    }
  },
  shttSelect:function(){
    if(this.data.shtt.value == '0'){
      if(this.data.evaluateScore < 2){
        this.setData({
          shtt: {
            value: evaluateLabels[2][5].labelId,
            text: this.data.shtt.text,
            color: evaluateColor[1]
          }
        })
      }else if(this.data.evaluateScore >=2 && this.data.evaluateScore < 4){
        this.setData({
          shtt: {
            value: evaluateLabels[1][5].labelId,
            text: this.data.shtt.text,
            color: evaluateColor[1]
          }
        })
      }else {
        this.setData({
          shtt: {
            value: evaluateLabels[0][5].labelId,
            text: this.data.shtt.text,
            color: evaluateColor[1]
          }
        })
      }
    }else{
      this.setData({
        shtt: {
          value: '0',
          text: this.data.shtt.text,
          color: evaluateColor[0]
        }
      })
    }
  },
})