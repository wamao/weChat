//index.js
//获取应用实例
const app = getApp()
var Http = require('../../service/service.js');// 请求方法
var page=1;   // 请求页数
Page({ 
  data: {
    page:1,
    title:'',
    categoryId:'',
    categoryList:[],
    windowHeight:'',
    windowWidth:''
    
  },

// 页面加载时
  onLoad: function (options) {
    this.setData({
      title: options.title,
      categoryId:options.categoryId
    });
    wx.setNavigationBarTitle({
      title: options.title//页面标题为路由参数
    });

    // 获取设备信息
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        })
      }
    });    
   
  },
  onReady: function () {
    //获得loading组件
    this.Loading = this.selectComponent("#loading");
    this.getlist(this);
  },
  /**
 * 生命周期函数--监听页面卸载
 */
  onUnload: function () {
       page=1;
  },
  // 请求数据
  getlist(){
    // 获取所有分类
    Http.Post('/categoryList', { ThirdCategoryId: this.data.categoryId, page:page}, this.sucFunc);
  },
  // 请求成功
  sucFunc: function (data) {
   if(data.status==0){
     let newArr = data.result.categoryList;
     newArr.forEach(function (item) {
       item.goodsImgUrl = item.goodsImgArr.split(',')[0];
     });
     let newList = this.data.categoryList;
     newList = newList.concat(data.result.categoryList);
     this.setData({ categoryList: newList});
     this.Loading.hidden(); // 隐藏加载进度条
   }
  },

  // 去详情页面
  goodsDetail(e){
    let goodsId = e.currentTarget.dataset.goodsid;
    wx.navigateTo({
      url: '../goodsdetail/goodsdetail' +'?goodsId='+goodsId
    });
  },

  bindDownLoad(){
    page++;
   this.getlist();
   console.log('2222222')
  }


 

 
})
