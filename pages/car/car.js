//index.js
//获取应用实例
const app = getApp()
var Http=require('../../service/service.js');
Page({
  data: {
    startTime:'',// 开始触摸时间
    startX:0, // 触摸开始位置
    ViewStyle:'left:0px',
    totalNum:0,
    totalPrice:'0.00',  // 总价
    selectAllStatus:0,
    listArr:[],
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    isChecked:1,
    windowHeight:'',
    windowWidth:'',
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  
 
  onReady: function () {
    //获得dialog组件
    this.Toast = this.selectComponent("#toast");
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


 // 单选
  singleSelect(e) {
    const index = e.currentTarget.dataset.index;          // 获取data- 传进来的index
    let  newListArr = this.data.listArr;                    // 获取购物车列表
    let  isChecked = newListArr[index].isChecked;         // 获取当前商品的选中状态
  
    newListArr[index].isChecked = isChecked?0:1;       // 改变状态
    this.setData({
      listArr: newListArr
    });
    this.getTotalPrice();                           // 重新获取总价
  },

  // 全选
  selectAll(e) {
      let newListArr = this.data.listArr;
      for (let i = 0; i < newListArr.length; i++) {
        newListArr[i].isChecked = this.data.selectAllStatus==0?1:0;            // 改变所有商品状态
      }

      this.setData({
        selectAllStatus: this.data.selectAllStatus?1:0,
        listArr: newListArr
      });
      this.getTotalPrice();                               // 重新获取总价
  },

// 数量减
  bindMinus:function(e){
      let newListArr = this.data.listArr;                  // 获取购物车列表
      let index = e.currentTarget.dataset.index;          // 获取data- 传进来的index
      if (newListArr[index].goodsNumber <= 1) {
          return;
      }
     newListArr[index].goodsNumber--;
     this.setData({
       listArr:newListArr
     });
     this.getTotalPrice(); // 计算总价
  },

  // 数量加
  bindAdd:function(e){
    let newListArr = this.data.listArr;                  // 获取购物车列表
    const index = e.currentTarget.dataset.index;          // 获取data- 传进来的index
    newListArr[index].goodsNumber++;
    this.setData({
      listArr: newListArr
    });
    this.getTotalPrice(); // 计算总价
  },
  // 计算总价
  getTotalPrice() {
    let newListArr = this.data.listArr;                  // 获取购物车列表
    let total = 0;
    let checkNum=0;
    for (let i = 0; i < newListArr.length; i++) {         // 循环列表得到每个数据
      if (newListArr[i].isChecked) {                   // 判断选中才会计算价格
          checkNum++;
          total += parseInt(newListArr[i].goodsNumber) * parseInt(newListArr[i].goodsPrice);     // 所有价格加起来
      }
    }
 
    if (checkNum == newListArr.length) {
      this.setData({
        selectAllStatus: 1,
        listArr: newListArr,
        totalPrice: total.toFixed(2)
      });
    } else {
      this.setData({
        selectAllStatus: 0,
        listArr: newListArr,
        totalPrice: total.toFixed(2)
      });
    }
    
  },

  // 获取购物车商品
  getCarlist: function () {
    var _this=this;
    Http.Post('/getCart', {},function(data){
      console.log(data);
          if(data.status==0){
            data.result.cartList.forEach(function(item){
               item.viewStyle= 'left:0px';
            });
             _this.setData({
                listArr: data.result.cartList
             });
          }
    });
  },

  delGoods:function(e){
   
    let ActiveIndex = e.currentTarget.dataset.index;
    let goodsId = e.currentTarget.dataset.goodsid;
    let cartList = this.data.listArr;
    let newCartList=[];
    let _this=this;
    wx.showModal({
      title: '提示',
      content: '确定删除这件商品？',
      confirmColor:'#000000',
      cancelColor:'#666666',
      success: function (res) {
      
        if (res.confirm) {
          Http.Post('/delCart', { goodsId: goodsId}, function (data) {
          
            if (data.status == 0) {
               newCartList = cartList.filter(function (item) { return item.goodsId != goodsId; });
               _this.setData({ listArr: newCartList });
            }else{
              cartList[ActiveIndex].ViewStyle = "left:0px";
              _this.setData({ listArr: cartList });
            }
           
          });
        }else{
            cartList[ActiveIndex].ViewStyle = "left:0px";
            _this.setData({ listArr: cartList });
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
      if (disX >= 60) {
        //控制手指移动距离最大值为删除按钮的宽度  
        ViewStyle="left:-60px";
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

    if (this.data.windowWidth-endX<60){
      return;
    }


    if (e.changedTouches.length == 1) {
      //手指移动结束后水平位置  
     
      //触摸开始与结束，手指移动的距离  
      var disX = this.data.startX - endX;
      var ViewStyle = disX > 60 / 2 ? "left:-" + 60 + "px" : "left:0px";
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
  // 订单提交
  pay(){
    let newlistArr=[]
    this.data.listArr.forEach(function(item){
      if (item.isChecked){
        newlistArr.push(item);
      }
    });

    if (newlistArr.length==0){
      this.Toast.showToast('至少选择一件商品');
      return
    }
    

    let order={
      listArr: newlistArr,
      totalPrice: this.data.totalPrice,

    }


    wx.navigateTo({
      url: '../order/order?order=' + JSON.stringify(order)
    });

 
  }
 
 
})
