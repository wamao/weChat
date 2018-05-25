// components/Toast/Toast.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    position:{
      type: Number,
      value: 100 
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // 弹窗显示控制
    show: true,
    message:'',
  },

  /**
   * 组件的方法列表
   */
  methods: {
      showToast(message,duration=2000){
         let _this=this;
         _this.setData({show:false,message:message});
         let timer = setTimeout( function() { 
           clearTimeout(timer);
           _this.setData({ show: true });
         },duration)
       }
  }
})
