// pages/allorder/allorder.js

var Http=require('../../service/service.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    finish:false,
    orderList:[], // 订单列表
    swiperHeight:0, // 获取设备高度
    ActiveIndex:0,
    tabItem:["全部","待付款","待发货","已发货","待评价"]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
    var res = wx.getSystemInfoSync();
    this.setData({
      swiperHeight: res.windowHeight
    })  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    //获得loading组件
    this.Loading = this.selectComponent("#loading");
    this.getOrder(); // 获取订单
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
   * tab点击切换
   */
  tab(e) {
   let index=e.currentTarget.dataset.index;
   this.setData({ActiveIndex:index});
  },

  // swiper 滚动事件
  swiperChange(e){
   let index=e.detail.current;
   this.setData({ActiveIndex:index});
  },

  // 获取所有的订单
  getOrder(){
  
    Http.Post('/getOrder', { orderType:0},(data)=>{
      console.log(data);
    if(data.status==0){
      data.result.orderList.forEach(function(item){
        item.goodsImgUrl = item.goodsImgArr.split(',')[0];
      });
      this.Loading.hidden(); // 隐藏加载进度条
      this.setData({ orderList: data.result.orderList,finish:true});
    }
    });
  },

  // 去详情页面
  detail(e){
    let item = JSON.stringify(e.currentTarget.dataset.item);
    wx.navigateTo({
      url: '../orderdetail/orderdetail?item=' + item,
    })
  },

  /**
  * 取消订单
  */
  cancel(e) {
    let _this=this;
    let newList=[];
    let orderList=this.data.orderList;
    let orderId=e.currentTarget.dataset.orderid;
    wx.showModal({
      title: '订单提示',
      content: '确定取消该订单？',
      confirmColor: '#000000',
      cancelColor: '#666666',
      success: (res) => {
        if (res.confirm) {
          Http.Post('/cancelOrder', { orderId: orderId}, function (data) {
            if (data.status == 0) {
              newList = orderList.filter(function (item) { return item.orderId != orderId; });
            }

            _this.setData({ orderList: newList});
          });
        }
      }
    });
  },

  /**
   * 去支付
   */
  pay() {
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