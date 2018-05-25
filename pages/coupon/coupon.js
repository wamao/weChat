// pages/coupon/coupon.js

var Http = require('../../service/service.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    finish:false,
    couponList: [] // 购物券
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    //获得loading组件
    this.Loading = this.selectComponent("#loading");
    this.getCoupon();// 获取用户优惠券
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 获取用户的购物券
   */
  getCoupon: function () {
    
    Http.Post('/getCoupon', {}, (data) => {
      console.log(data);
      if (data.status == 0) {
       this.Loading.hidden(); // 隐藏加载进度条
       this.setData({ couponList: data.result.couponList, finish:true});
      }
    });
  },
 
})