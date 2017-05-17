var Bmob = require('../../utils/bmob.js');

var app = getApp()


const prison_list = ['哈尔滨监狱', '呼兰监狱']



Page({
  data: {
    prisons: prison_list,
    title: {},
    content: {},
    userInfo: {}
  },
  onLoad: function (options) {





    var Diary = Bmob.Object.extend("diary");
    var User = Bmob.Object.extend("user");
    var insert_user = new Bmob.Query(User);
    var query = new Bmob.Query(Diary);
    var me = new Object();
    var userInfo = new Object();



    app.getUserInfo(function (userInfo) {
      userInfo = userInfo;
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
    });

    var that = this
    query.find({
      success: function (results) {
        // 查询成功
        var i = results.length - 1
        var object = results[i];
        app.getUserInfo(function (userInfo) {
        var nickname = userInfo.nickName
        var url = userInfo.avatarUrl
        var people = { nickname: nickname, url: url };
        console.log(userInfo.nickName);
        object.addUnique("people", people);
        object.save(null, {
          success: function (result) {
            console.log("日记创建成功, objectId:" + result.id);
          },
          error: function (result, error) {
            // 添加失败
            console.log('创建日记失败');

          }
        });
        });
        me.addUnique("InBox", object.id)
        me.save(null, {
          success: function (result) {
            console.log("收件箱插入成功");
          }
        })



        var people = object.get("people")
        var title = object.get("title")
        console.log("title:" + title);
        console.log("nickname:" + people[0].nickname);
        that.setData(
          {
            title: object.get("title"),
            content: object.get("content"),
            userinfo: object.get("people")

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