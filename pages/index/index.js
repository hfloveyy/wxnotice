//index.js
var Bmob = require('../../utils/bmob.js');
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
    var User = Bmob.Object.extend("user");
    

    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      var query_user = new Bmob.Query(User);
      query_user.equalTo("nickName", userInfo.nickName);
      query_user.equalTo("avatarUrl", userInfo.avatarUrl);
      query_user.find({
        success: function (results) {
          console.log("查询成功");
          if(results.length>0){
            for (var i = 0; i < results.length; i++) {
              var object = results[i];
              console.log(object.id + ' - ' + object.get('nickName'));
            }
          }else{
            var user = new User();
            user.set("nickName", userInfo.nickName)
            user.set("avatarUrl", userInfo.avatarUrl)
            user.save(null, {
              success: function (result) {
                // 添加成功，返回成功之后的objectId（注意：返回的属性名字是id，不是objectId），你还可以在Bmob的Web管理后台看到对应的数据
                console.log("用户添加成功, objectId:" + result.id);
              },
              error: function (result, error) {
                // 添加失败
                console.log('用户添加失败');
              }
            });
          }
          
        },
        error: function (error) {
          console.log("查询失败: " + error.code + " " + error.message);
          
        }
      });

      
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })

  }
})
