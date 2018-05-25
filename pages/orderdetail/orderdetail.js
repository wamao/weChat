var Http=require('../../service/service.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
   item:{} // 订单详情
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ item: JSON.parse(options.item)})
    console.log(options);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
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
   * 取消订单
   */
  cancel (e) {
  
    wx.showModal({
      title: '订单提示',
      content: '确定取消该订单？',
      confirmColor: '#000000',
      cancelColor: '#666666',
      success:  (res)=> {
        if (res.confirm) {
          Http.Post('/cancelOrder', { orderId: this.data.item.orderId }, function (data) {
            if (data.status == 0) {
                console.log(data);
            }
          });
        }
      }
    });
  },
  
  /**
   * 去支付
   */
  pay(){
    wx.showModal({
      title: '订单提示',
      content: '抱歉，暂未开通支付功能！',
      confirmColor: '#000000',
      cancelColor: '#666666',
      success: function (res) {
         
      }
    });
  }
})