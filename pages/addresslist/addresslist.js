//logs.js
const util = require('../../utils/util.js')
var Http=require('../../service/service.js');
Page({
  data: {
   addressList:[],
   type:'',
   finish:false
  },
  onReady: function () {
    //获得loading组件
     this.getAddress(); // 获取所有的地址
    this.Loading = this.selectComponent("#loading");
    this.getAddress(); // 获取所有的地址
  
  },
  onShow() {
  
  },
  onLoad: function (options) {
    this.setData({ type: options.type});
  },
  //获取地址
  getAddress(){
    Http.Post('/getAddress',{},this.sucFun);
  },

  //请求成功
  sucFun(data){
    if(data.status==0){
      this.Loading.hidden(); // 隐藏加载进度条
      this.setData({ addressList: data.result.addressList, finish:true});
    }
  
  },
  
  // 添加地址
  add_address(){
    wx.navigateTo({
      url: '../addaddress/addaddress'
    });
  },
  //编辑地址
  edit(e){
    let item =e.currentTarget.dataset.item;

    if(this.data.type==1){
      wx.navigateBack();
      // 往上一级页面传参
      var pages = getCurrentPages();
      var prevPage = pages[pages.length - 2]; // 上一级页面
      // 直接调用上一级页面Page对象，存储数据到上一级页面中\
      prevPage.setData({
        'address': item,
      });
    }else{
      wx.navigateTo({
        url: '../editaddress/editaddress?item=' + JSON.stringify(e.currentTarget.dataset.item)
      });
    }
     
  }
})
