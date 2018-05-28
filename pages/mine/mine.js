//index.js
//获取应用实例
const app = getApp();


Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  
  onLoad: function () {
   
  },
  getUserInfo: function(e) {
   
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  // 地址
  address:function(){
       wx.navigateTo({
      url: '../addresslist/addresslist?type=0'
    });
   
  },
 // 订单页面
  order: function (e) {
    wx.navigateTo({
      url: '../allorder/allorder'
    });
  },
  // 收藏页面
  collect: function (e) {
    wx.navigateTo({
      url: '../collect/collect'
    });
  },

  // 联系客服
  calling: function () {
    wx.makePhoneCall({
      phoneNumber: '137203806XX', //此号码并非真实电话号码，仅用于测试  
      success: function () {
     
      },
      fail: function () {
      
      }
    })
  },

  // 优惠券页面
  coupon(){
    wx.navigateTo({
      url: '../coupon/coupon'
    });
  }

 
})
