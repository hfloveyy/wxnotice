// pages/notice/index.js
var Bmob = require('../../utils/bmob.js');

var app = getApp()


Page({
  data: {
    title: "",
    content: ""
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
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
  },
  onPushSubmit: function (e) {
    var _title = e.detail.value.title
    var _content = e.detail.value.content
    var Diary = Bmob.Object.extend("diary");
    var User = Bmob.Object.extend("user");
    var insert_user = new Bmob.Query(User);
    var diary = new Diary();
    var me = new Object();
    app.getUserInfo(function (userInfo) {
      var query_user = new Bmob.Query(User);
      query_user.equalTo("nickName", userInfo.nickName);
      query_user.equalTo("avatarUrl", userInfo.avatarUrl);
      query_user.find({
        success: function (results) {
          console.log("查询成功");
          if (results.length > 0) {
            for (var i = 0; i < results.length; i++) {
              var object = results[i];
              me = object;
              console.log(object.id + ' - ' + object.get('nickName'));
            }
          }
        },
        error: function (error) {
          console.log("查询失败: " + error.code + " " + error.message);

        }
      });



    })

    diary.set("title", _title);
    diary.set("content", _content);
    //添加数据，第一个入口参数是null
    diary.save(null, {
      success: function (result) {
        // 添加成功，返回成功之后的objectId（注意：返回的属性名字是id，不是objectId），你还可以在Bmob的Web管理后台看到对应的数据
        console.log("日记创建成功, objectId:" + result.id);
        me.addUnique("OutBox", result.id)
        me.save(null,{
          success:function(result){

          }
        })
        wx.navigateTo({
          url: 'notice?id=' + result.id,
          success: console.log("navigate success!")
        })
      },
      error: function (result, error) {
        // 添加失败
        console.log('创建日记失败');

      }
    });

    //发布通知

  }
})