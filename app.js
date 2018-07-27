//app.js
var dataObj = require("data/data.js");
App({
    onLaunch: function() {
        // 展示本地存储能力
        var logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)
        this._getUserInfo();
        
    },
    globalData: {
        g_isPlayingMusic: false,
        g_currentMusicPostId: null,
        doubanBase: "https://api.douban.com",
        g_userInfo:null
    },
    //获取用户的基本信息
    _getUserInfo:function(){
        var userInfoStorage = wx.getStorageSync('user');
        if (!userInfoStorage) {
            var that = this;
            wx.login({
                success: function () {
                    // 查看是否授权
                    wx.getSetting({
                        success: function (res) {
                            if (res.authSetting['scope.userInfo']) {
                                // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                                wx.getUserInfo({
                                    success: function (res) {
                                        wx.getUserInfo({
                                            success: function (res) {
                                                that.globalData.userInfo = res.userInfo;
                                                //将用户的基本信息保存到缓存中
                                                wx.setStorageSync('user', res.userInfo)
                                            },
                                            fail: function (res) {
                                                console.log(res, 333);
                                            }
                                        })
                                    }
                                })
                            }
                        },
                        fail:function(res){
                            console.log(res,222222)
                        }
                    })
                   
                }
            })
        } else {
            //如果缓存中已经存在用户的基本信息，那么将信息保存到全局变量中
            this.globalData.userInfo = userInfoStorage;
        }
        
    }
})