var app = getApp()
Page({
  data: {
    /** 
      * 页面配置 
      */
    winWidth: 0,
    winHeight: 0,
    // tab切换  
    currentTab: 0,
  },
  onLoad: function (options) {
    var that = this;

    /** 
     * 获取系统信息 
     */
    wx.getSystemInfo({

      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight,
          currentTab: options.currentTab
        });
      }

    });
  },
  /** 
    * 滑动切换tab 
    */
  bindChange: function (e) {

    this.setData({ currentTab: e.detail.current });

  },
  /** 
   * 点击tab切换 
   */
  swichNav: function (e) {
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      this.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  /** 
  * 点击分享 
  */
  onShareAppMessage: function () {
    return {
      title: '装逼小程序',
      path: '/page/user?id=123'
    }
  }
})  