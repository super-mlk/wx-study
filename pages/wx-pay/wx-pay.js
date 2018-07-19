// pages/wx-pay/wx-pay.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  //微信支付
  onTap: function() {
    // wx.login({
    //   success: function(res) {
    //     wx.request({
    //       url: 'http://127.0.0.1/OrangeCanServer/wxPay.php',
    //       data: {
    //         code: res.code
    //       },
    //       success: function(res) {
    //         var preData = res.data;
    //         console.log(res,2);
    //         wx.requestPayment({
    //           timeStamp: preData.timeStamp.toString(),
    //           nonceStr: preData.nonceStr,
    //           package: preData.package,
    //           signType: preData.signType,
    //           paySign: preData.paySign,
    //           success:function(res){
    //             console.log(res,1);
    //           },
    //           fail:function(error){
    //             console.log(error,2);
    //           }
    //         })
    //       }
    //     })
    //   }
    // })
      wx.login({
          success: function (loginCode) {
              //调用request请求api转换登录凭证  
              wx.request({
                  url: 'https://xcx.shop5x.com/xcx/getOpenid?code=' + loginCode.code,
                  header: {
                      'content-type': 'application/json'
                  },
                  success: function (res) {
                      console.log(res);
                      wx.setStorageSync("openid", res.data.openid);
                      // console.log(res.data.openid) //获取openid  
                  },
                  fail:function(res){
                      console.log(res);
                  }
              })
          }
      })  
  }
})