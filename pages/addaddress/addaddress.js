//logs.js
const util = require('../../utils/util.js');
var Http=require('../../service/service.js');
Page({
  data: {
    message:'错误提示',
    toastHidden: true, //吐司  
    toastText: '',//吐司文本  
    ContactPerson:'',  // 联系人姓名
    ContactNumber:'',  // 联系人电话
    ContactAddress: '', // 所在地区
    ContactDetailAddress: '', // 详细地址
    isDefault:0,  // 是否设置为默认地址
    ContactAddress:[],  // 选择地区的值
  },

  onReady:function(){
    //获得dialog组件
    this.Toast = this.selectComponent("#toast");
  },
  
  onLoad: function () {
    wx.setNavigationBarTitle({
      title: '添加新的收货地址'//页面标题为路由参数
    });
  },

  //获取输入name 的值
  bindName(e){
    this.setData({
      ContactPerson: e.detail.value
    });
  },
  //获取输入电话号码的值
  bindPhone(e) {
    this.setData({
      ContactNumber: e.detail.value
    });
  },
  //获取输入详细地址 的值
  bindDetail(e) {
    this.setData({
      ContactDetailAddress: e.detail.value
    });
  },
  default(){
    let select=this.data.isDefault?0:1;
    this.setData({ isDefault: select});
  },

  // 地址选择
  bindRegionChange: function (e) {
    this.setData({
      ContactAddress: e.detail.value[0] + ' ' + e.detail.value[1] + ' ' + e.detail.value[2]
    });
  },
  // 确认添加
  add(){
    if (this.data.ContactPerson.length==0){
      this.Toast.showToast('请输入联系人名称');
      return;
    }

    if (this.data.ContactNumber.length == 0) {
      this.Toast.showToast('请输入联系人手机号码');
      return;
    }

    if (this.data.ContactAddress.length == 0) {
      this.Toast.showToast('请选择所在地区');
      return;
    }

    if (this.data.ContactDetailAddress.length == 0) {
      this.Toast.showToast('请输入详细地址');
      return;
    }

    let addressParam = {
      isDefault: this.data.isDefault,
      ContactPerson: this.data.ContactPerson, // 联系人
      ContactNumber: this.data.ContactNumber, // 联系电话
      ContactAddress: this.data.ContactAddress, //地区
      ContactDetailAddress: this.data.ContactDetailAddress// 详细地址
    }

    //添加新地址
     Http.Post('/addAddress', addressParam, this.sucFunc);
  },

  // 请求成功
  sucFunc(data){
   
   if(data.status==0){
     let addressParam=data.result; 
     console.log(data.result)
     // 往上一级页面传参
     var pages = getCurrentPages();
     var prevPage = pages[pages.length - 2]; // 上一级页面
     // 直接调用上一级页面Page对象，存储数据到上一级页面中\
     prevPage.setData({
       'address':addressParam,
     });
     wx.navigateBack();
   }
  },

  // toast 提示
  onToastChanged: function () {
    this.setData({ toastHidden: !this.data.toastHidden });
  },  
})
