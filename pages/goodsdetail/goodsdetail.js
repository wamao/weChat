
const Http=require('../../service/service.js')
Page({
  data: {
    showToast:false, // 错误提示
    showMsg:'', // 错误提示
    showModalStatus:false, // 显示底部弹窗
    bannerHeight:'', // 轮播图swiper 的高度
    goodsId:'', // 商品id
    goodsStyle:'',
    goodsSize:'',
    goodsNumber:'',
    StyleIndex:9,
    SizeIndex:9,
    goodsNumber:1,
    hasSelect:0,
    goodsDetail:{} // 商品详情
  },
  onLoad: function (options) {
    console.log(options.goodsId)
    this.setData({
      goodsId: options.goodsId,
    });
    wx.setNavigationBarTitle({
      title:'商品详情'//页面标题为路由参数
    });
    this.getDetail(); // 获取商品详情
    let token = wx.getStorageSync('token');
    if (token) {
     // this.isCollect();// 是否已经收藏
    }
   
  },

  onReady: function () {
    //获得dialog组件
    this.Toast = this.selectComponent("#toast");
  },

  getDetail(){
    Http.Post('/goodsDetail', {goodsId:this.data.goodsId}, this.sucFunc);
  },

  sucFunc(data){
    console.log(data);
     if(data.status==0){
        this.setData({
          goodsDetail:data.result.goodsDetail
        })
     }
  
  },

  //图片加载事件监听
  imageLoad(e){
    var res = wx.getSystemInfoSync();
    var imgwidth = e.detail.width,
      imgheight = e.detail.height,
      ratio = imgwidth / imgheight;
    this.setData({
      bannerHeight: res.windowWidth / ratio
    })  
  },
  //显示对话框
  showModal() {
    // 显示遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation;
    animation.translateY(0).step();
      var _this=this;
    this.setData({
      showModalStatus: true,
    
     
    },function(){
      _this.setData({ animationData: animation.export(),})
    });
 
  },
  //隐藏对话框
  hideModal(){
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY('100%').step()
    this.setData({
      showModalStatus:false,
      animationData: animation.export(),
    });
  
  },


// 加入购物车
  addCart(){
    var _this=this;
    if (this.data.showModalStatus){

      if (this.data.goodsStyle.length==0) {
        _this.Toast.showToast('请选择款式');
        return;
      }

      if (this.data.goodsSize.length == 0) {
        _this.Toast.showToast('请选择尺码');

          return;
      }

      let goodsParams={
        goodsId:this.data.goodsId,
        goodsNumber:this.data.goodsNumber,
        goodsSize:this.data.goodsSize,
        goodsStyle:this.data.goodsStyle
      }

      Http.Post('/addCart', goodsParams, function(data){
      
          if(data.status==0){
            _this.hideModal();
            _this.Toast.showToast(data.message);
          }
      });



    }else{
      // 弹出提示框
      this.showModal();
    }
   

  },

  buy(){
    //this.showModal();
    Http.Post('/addChosen', { goodsId: this.data.goodsId }, (data) => {
      if (data.status == 0) {
        this.Toast.showToast('添加成功');
      }
    });
  },

  // 关闭modal
  closeModal(){
    this.hideModal();
  },
 
 // 选择款式
  selectStyle(e){
    this.setData({ goodsStyle: e.currentTarget.dataset.index, StyleIndex: e.currentTarget.dataset.index});
  },
  // 选择尺码
  selectSize(e){
    this.setData({ goodsSize: e.currentTarget.dataset.item, SizeIndex: e.currentTarget.dataset.index });
  },
  // 加数量
  add(){
    this.setData({ goodsNumber: ++this.data.goodsNumber});
  },
  // 减数量
  min(){
    if(this.data.goodsNumber<=1){
      return;
    }
    this.setData({ goodsNumber: --this.data.goodsNumber });
  },

   // 查询用户是否已经收藏过
   isCollect(){
     Http.Post('/isCollect', { goodsId: this.data.goodsId }, (data) => {
       if (data.status == 0) {
         this.setData({ hasCollect: data.result.hasCollect });
       }
     });
   },

  // 商品收藏，取消
  collect(){
    let token = wx.getStorageSync('token'); // 获取token
    if (!token){
      wx.showModal({
        title: '提示',
        content: '您还未授权登录？',
        confirmColor: '#000000',
        cancelColor: '#666666',
        success: function (res) {
         
        }
      });

      return; 
     }


     // 取消还是收藏 
    let requestUrl = this.data.hasCollect?'/cancelCollect':'/collect'
    Http.Post(requestUrl, { goodsId: this.data.goodsDetail.goodsId},(data)=> {
      console.log(data);
      if (data.status == 0) {
        this.setData({ hasCollect: data.result.hasCollect});
        this.Toast.showToast(data.message);
      }
    });
  },

  addDiscount(){
    Http.Post('/addDiscount', { goodsId: this.data.goodsDetail.goodsId, discount:'0.75' }, (data) => {
      console.log(data);
      if (data.status == 0) {
        this.Toast.showToast('添加成功');
      }
     
    }); 
  }


})
