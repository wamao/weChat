//app.js
var Http = require('./service/service.js');
App({
  onLaunch: function () {
    // 登录
    wx.login({
      success: res => {

      let token=  wx.getStorageSync('token');
      if(token){
        return;
      }
      Http.Post('/wxlogin', { code: res.code }, function (data) {
          if(data.status==0){
             console.log(data);
            wx.setStorage({
              key: "token",
              data: data.result.token
            })
          }
        });
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
       
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
  }
})