// pages/order.js
var Http=require('../../service/service.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listArr:[] ,// 商品清单
    totalPrice:'', // 总价格
    address:{} // 地址id
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAddress(); // 获取用户地址信息;
    let order = JSON.parse(options.order);
      order.listArr.forEach(function(item){
        item.remark=''
      });
    this.setData({
      listArr: order.listArr,// 商品清单
      totalPrice: order.totalPrice, // 总价格
    });
 
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {
   
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
   * 获取用户地址
   */
  getAddress() {
    var _this=this;
    Http.Post('/getAddress', {}, function(data){
       if(data.status==0){
       
        let addressList = data.result.addressList;// 地址列表
        
         if(addressList.length==0){
            wx.showModal({
              title: '订单提示',
              content: '您还未添加收货地址，现在去添加？',
              confirmColor: '#000000',
              cancelColor: '#666666',
              success: function (res) {
                if (res.confirm) {
                  wx.navigateTo({
                    url: '../addaddress/addaddress',
                  });
                } 
              }
            });     
           }else{
              _this.setData({   address: addressList[0]});
           } 
       }
     
    });
  },

  //去地址页面
  addressList(){
     wx.navigateTo({
       url: '../addresslist/addresslist?type=1',
     })
  },
  // 备注信息
  listenerInput(e){
    let value = e.detail.value;
    let ActiveIndex=e.currentTarget.dataset.index;
    let newListArr=this.data.listArr;
    newListArr[ActiveIndex].remark=value;
    this.setData({listArr:newListArr});
  },

  // 去支付
  pay(){
    var _this=this;
    if (this.data.address.addressId){
      wx.showModal({
        title: '订单提示',
        content: '您还未添加收货地址，现在去添加？',
        confirmColor: '#000000',
        cancelColor: '#666666',
        success: function (res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '../addaddress/addaddress',
            });
          }
        }
      });
      return;     
    }
   
   
    let newList=[];
    this.data.listArr.forEach(function (item) {
       let newItem={};
        newItem.goodsId = item.goodsId;
        newItem.addressId = _this.data.address.AddressId;
        newItem.goodsNumber = item.goodsNumber;
        newItem.goodsSize = item.goodsSize;
        newItem.remark = item.remark;
        newList.push(newItem);
      });

  
    wx.showToast({
      title: '订单提交中',
      icon: 'loading',
      duration: 10000
    });
    

    let timer=setTimeout(function(){
      Http.Post('/submitOrder', { order: newList }, function (data) {
        console.log(data);
        if(data.status==0){
          wx.hideToast();
          clearTimeout(timer);
          wx.showModal({
            title: '订单提示',
            content: '暂未开通支付功能，提交的订单可在我的-我的订单页面查看！',
            confirmColor: '#000000',
            cancelColor: '#666666',
            success: function (res) {
                wx.navigateTo({
                  url: '../allorder/allorder',
                });
              
            }
          });
         
        }
      
      });
    },3000);

    
   
  }
})