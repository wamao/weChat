// pages/search/search.js
var Http=require('../../service/service.js');
var page=1;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodslist:[],
    keyword:'',
    windowHeight:'',
    windowWidth: '',
    finish:true,
    history:[],
    isSearch:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取设备信息
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        })
      }
    });  
    let keyword = wx.getStorageSync('keyword'); // 获取keyword
    if (keyword){
      this.setData({ history:keyword.split(',')});
     }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    //获得dialog组件
    this.Toast = this.selectComponent("#toast");
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
  
  } ,
 // 取消搜索
  cancel(){
    wx.navigateBack();
  },



  search(){
  
    Http.Post('/searchGoods', { keyword: this.data.keyword,page: page},(data)=>{
      console.log(data);
     if(data.status==0){
       let newArr = data.result.goodslist;
       newArr.forEach(function (item) {
         item.goodsImgUrl = item.goodsImgArr.split(',')[0];
       });
       let newList = this.data.goodslist;
       newList = newList.concat(newArr);
       this.setData({ goodslist: newList, finish:true,});
       
     }
    });
    
  },



  // 去详情页面
  goodsDetail(e) {
    let goodsId = e.currentTarget.dataset.goodsid;
    wx.navigateTo({
      url: '../goodsdetail/goodsdetail' + '?goodsId=' + goodsId
    });
  },
  // 上拉加载
  bindDownLoad() {
    page++;
    this.search();
   
  },

  // input 输入
  input(e){
    let keyword = e.detail.value;
    this.setData({keyword: keyword });
  },

  // 搜索
  confirm(e){

    if(!this.data.keyword){
      this.Toast.showToast('请输入搜索关键字');
       return;
    } 

    let keyword = wx.getStorageSync('keyword'); // 获取keyword
    if (keyword) {
      let newString = keyword + ',' + this.data.keyword;
      wx.setStorage({
        key: 'keyword',
        data: newString,
      });
    } else {
      wx.setStorage({
        key: 'keyword',
        data: this.data.keyword,
      });
    }
    page=1;
    this.setData({ goodslist:[],finish: false,isSearch:true});
    this.search();
  },

  // 清除搜索记录
  del(){
    wx.removeStorage({ key:'keyword'});
    this.setData({history:[]});
  },

  // 清除输入框
  clear(){
    this.setData({ keyword: '' })
  },
  // 历史记录搜索
  keywordSearch(e){
      let keyword=e.currentTarget.dataset.keyword;
      this.setData({ keyword: keyword, isSearch: true, goodslist: [], finish: false,});
      page=1;
      this.search(); // 搜索
  }

})