//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onShareAppMessage: function () {
    return {
      title: '自定义分享标题',
      path: '/pages/index/index',
      success: function (res) {
        // 分享成功
        console.log('share success!')
      },
      fail: function (res) {
        // 分享失败
        console.log('share fail!')
      }
    }
  },
  onLoad: function () {

    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
    
  }
})
