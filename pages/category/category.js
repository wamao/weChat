//index.js
//获取应用实例
const app = getApp();
var page = 1;   // 请求页数
var Http=require('../../service/service.js')
Page({
  data: {
    finish:false,
    windowHeight: '',  // 屏幕高度
    windowWidth: '' ,    //屏幕宽度
    isScroll:false,// 是否允许滚动
    activeIndex:0,
    categoryList:[] // 分类json数组
  },
  //事件处理函数
  pushcategory: function () {
    wx.navigateTo({
      url: '../category/category'
    })
  },
  // 页面加载时
  onLoad: function (options) {
   
    // 获取设备信息
    wx.getSystemInfo({
      success: (res) => {
        console.log(res.windowHeight)
        this.setData({
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        })
      }
    });
   
  },
  /**
 * 生命周期函数--监听页面初次渲染完成
 */
  onReady: function () {
    //获得loading组件
    this.Loading = this.selectComponent("#loading");
    this.getlist(this);
  },

  // 请求数据
  getlist: function (that) {
    // 获取所有分类
    Http.Post('/category', {}, this.sucFunc);
  },
  // 请求成功
  sucFunc:function(data){
    this.Loading.hidden(); // 隐藏加载进度条
    this.setData({ categoryList: data.result.category.data, finish:true});
  },
  // 点击左侧导航栏
    Tap_category: function (e) {
      var _this=this;
      let activeIndex = e.currentTarget.dataset.index;
      this.setData({ isScroll:true},function(e){
        _this.setData({ activeIndex: activeIndex });
      });
    },

  //右侧导航触摸事件
    tocuhStart(){
      this.setData({ isScroll: false });
    },

    //去分类查询页面
    To_category(e){
      let categoryId = e.currentTarget.dataset.info.categoryId;
      let title = e.currentTarget.dataset.info.title;
     
      wx.navigateTo({
        url: '../categorylist/categorylist' + '?categoryId=' + categoryId+'&title='+title


      })
    }   
 

})
