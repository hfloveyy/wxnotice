var Bmob = require('../../utils/bmob.js');




const prison_list = ['哈尔滨监狱', '呼兰监狱']



Page({
  data: {
    prisons:prison_list,
    title: {},
    content: {}
  },
  onLoad: function (options) {
    var Diary = Bmob.Object.extend("diary");
    var query = new Bmob.Query(Diary);
    var that = this
    query.find({
      success: function (results) {
        // 查询成功
        var i = results.length - 1
        var object = results[i];
        that.setData(
          {
            title: object.get("title"),
            content: object.get("content")
          }
        )
      },
      error: function (error) {
        alert("查询失败: " + error.code + " " + error.message);
      }
    });


    // 页面初始化 options为页面跳转所带来的参数

  },
  onShareAppMessage: function () {
    return {
      title: '发通知',
      path: '/pages/notice/notice',
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
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }

})