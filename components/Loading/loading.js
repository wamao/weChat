// components/loading.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
      show:true
  },

  /**
   * 组件的方法列表
   */
  methods: {
     // 隐藏加载框
      hidden(){
        this.setData({show:false});
      },

      // 显示加载框
      show(){
        this.setData({ show: true });
      }
  }
})
