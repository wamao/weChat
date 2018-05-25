//index.js
//获取应用实例
const app = getApp()
var page=1;   // 请求页数
var Http=require('../../service/service.js');
Page({ 
  data: {
    motto: 'Hello World',
    userInfo: {},
    listArr:[],
    goodsImgArr: ["/assets/images/imgCover3.jpg","/assets/images/imgCover4.jpg"],
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    windowHeight:'',  // 屏幕高度
    windowWidth:''     //屏幕宽度
  },
  //事件处理函数
  pushcategory: function(e) {
    wx.navigateTo({
      url: '../category/category?categoryId=' + e.currentTarget.dataset.categoryid
    })
  },
// 页面加载时
  onLoad: function () {
    this.getlist(this);
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





 // 请求数据
  getlist:function(that){


    // 获取所有分类
    Http.Post('/getChosen', {}, this.sucFunc);
  },

  // 请求成功
  sucFunc: function (data) {
    console.log(data);
    if (data.status == 0) {
      let newArr = data.result.chosenList;
      newArr.forEach(function (item) {
        item.goodsImgUrl = item.goodsImgArr.split(',')[0];
      });
      let newList = this.data.listArr;
      newList = newList.concat(data.result.chosenList);
      this.setData({ listArr: newList });
    }
  },

  // 上拉加载·更多
  // searchScrollLower:function(){
  //   page++;
  //   this.getlist(this);
  // },

  scan:function(){
    // 允许从相机和相册扫码
    wx.scanCode({
      success: (res) => {
        console.log(res)
      }
    })

    // 只允许从相机扫码
    // wx.scanCode({
    //   onlyFromCamera: true,
    //   success: (res) => {
    //     console.log(res)
    //   }
    // })
  },
   
  

  search(){
    wx.navigateTo({
      url: '../search/search',
    })
  }
 
})
