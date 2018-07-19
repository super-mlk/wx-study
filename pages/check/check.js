// pages/check/check.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  //校验用户信息
  onTap:function(){
    wx.login({
      success:function(loginRes){
        wx.getUserInfo({
          success:function(userRes){
            wx.request({
              url: 'http://192.168.55.112/OrangeCanServer/wxCheckUserInfo.php',
              data:{
                code:loginRes.code,
                signature:userRes.signature,
                rawData:userRes.rawData
              },
              success:function(res){
                console.log(res.data);
              }
            })
          }
        })
      }
    })  
  }
})