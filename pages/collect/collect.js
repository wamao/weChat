//index.js
//获取应用实例
const app = getApp()
var Http=require('../../service/service.js');
Page({
  data: {
    startTime:'',// 开始触摸时间
    startX:0, // 触摸开始位置
    ViewStyle:'left:0px',
    selectAllStatus:0,
    collectList:[],
    isChecked:1,
    windowHeight:'',
    windowWidth:'',
    finish:false
  },
  

  onReady: function () {
    //获得dialog组件
    this.Toast = this.selectComponent("#toast");
    //获得loading组件
    this.Loading = this.selectComponent("#loading");
  },
  onShow:function(){
    // 获取sessionid
   // let sessionid = wx.getStorageSync('sessionid');
  
    this.getCarlist();
  },

  onHide(){
      this.setData({
        totalPrice: '0.00',  // 总价
        selectAllStatus: 0,
      });
  },
  onLoad: function () {
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


  // 获取收藏的商品
  getCarlist: function () {
    var _this=this;
    Http.Post('/getCollect', {},function(data){
      console.log(data);
          if(data.status==0){
            data.result.collectList.forEach(function(item){
               item.viewStyle= 'left:0px';
               item.goodsImgUrl = item.goodsImgArr.split(',')[0];
            });
             _this.setData({
              finish:true,
               listArr: data.result.collectList
             });

             _this.Loading.hidden(); // 隐藏加载进度条
          }
    });
  },

  delGoods:function(e){

    console.log(e);
    let ActiveIndex = e.currentTarget.dataset.index;
    let goodsId = e.currentTarget.dataset.goodsid;
    let collectList = this.data.listArr;
    let newCollectList=[];
    let _this=this;
    wx.showModal({
      title: '提示',
      content: '确定取消收藏这件商品么？',
      confirmColor:'#000000',
      cancelColor:'#666666',
      success: function (res) {
        if (res.confirm) {
          Http.Post('/cancelCollect', { goodsId: goodsId}, function (data) {
            console.log(data);
            if (data.status == 0) {
              newCollectList = collectList.filter(function (item) { return item.goodsId != goodsId; });
              _this.setData({ listArr: newCollectList });
            }else{
              collectList[ActiveIndex].ViewStyle = "left:0px";
              _this.setData({ listArr: collectList });
            }
           
          });
        }else{
          collectList[ActiveIndex].ViewStyle = "left:0px";
            _this.setData({ listArr: collectList });
        }

       
       

      }
    })  
  }

  ,
 // 开始触摸
  touchStart(e){
    if (e.touches.length == 1) {
      this.setData({
        //设置触摸起始点水平方向位置  
        startTime: e.timeStamp,
        startX: e.touches[0].clientX
      });

      let list = this.data.listArr;
      var ActiveIndex = e.currentTarget.dataset.index;
      list.forEach(function (item, index) {
        if (ActiveIndex!=index){
          item.ViewStyle = "left:0px";
        }
      });

      //更新列表的状态  
      this.setData({
        listArr: list
      });  


    }  
  },
 

  //触摸移动
  touchMove(e){
    var that = this
    
    if (e.touches.length == 1) {
      //手指移动时水平方向位置  
      var moveX = e.touches[0].clientX;
      //手指起始点位置与移动期间的差值  
      var disX = this.data.startX - moveX;
      var ViewStyle = "";
      if (disX == 0 || disX < 0) {   //如果移动距离小于等于0，文本层位置不变  
        ViewStyle = "left:0px";
      } else if (disX > 0) {         //移动距离大于0，文本层left值等于手指移动距离  
        ViewStyle = "left:-" + disX + "px";
       
      } 
      if (disX >= 80) {
        //控制手指移动距离最大值为删除按钮的宽度  
        ViewStyle="left:-80px";
      }  
     
     var index = e.currentTarget.dataset.index;
  
      var list = this.data.listArr;

      list[index].ViewStyle = ViewStyle;


      //更新列表的状态  
      this.setData({
        listArr: list
      });  

    }  
  },

  // 触摸结束
  touchEnd(e) {

    var endX = e.changedTouches[0].clientX;

    if (this.data.windowWidth-endX<80){
      return;
    }


    if (e.changedTouches.length == 1) {
      //手指移动结束后水平位置  
     
      //触摸开始与结束，手指移动的距离  
      var disX = this.data.startX - endX;
      var ViewStyle = disX > 80 / 2 ? "left:-" + 80 + "px" : "left:0px";
      //获取手指触摸的是哪一项  
      var index = e.currentTarget.dataset.index;
      var list = this.data.listArr;
      list[index].ViewStyle = ViewStyle;
      //更新列表的状态  
      this.setData({
        listArr: list
      });  



    }  
  },

  // 商品详情
  detail(e){
    let goodsId = e.currentTarget.dataset.goodsid;
    wx.navigateTo({
      url: '../goodsdetail/goodsdetail' + '?goodsId=' + goodsId
    });
  }
 
 
})
