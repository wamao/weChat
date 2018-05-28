// pages/discount/discount.js

var Http=require('../../service/service.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
       list:[]
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
    this.getList();
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

   // 获取折扣商品
   getList(){
     // 获取所有分类
     Http.Post('/getDiscount', {}, (data)=>{
        if(data.status==0){
          let newArr = data.result.discountList;
          newArr.forEach(function (item) {
            item.goodsImgUrl = item.goodsImgArr.split(',')[0];
            item.discountPrice = (item.goodsPrice.replace(',', '') * item.discount).toFixed(2);
          });
          let newList = this.data.list;
          newList = newList.concat(newArr);
          this.setData({ list: newList });
          this.Loading.hidden(); // 隐藏加载进度条
        }
       });
   },

  // 去商品详情页面
   detail(e){
    let goodsId = e.currentTarget.dataset.goodsid;
     wx.navigateTo({
       url: '../goodsdetail/goodsdetail' + '?goodsId=' + goodsId
     });
   }

})